const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const Clinica = require('./models/Clinica');
const Mensagem = require('./models/Mensagem');
const Paciente = require('./models/Paciente');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.27:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/app-sacados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.get('/api/setores', (req, res) => {
  res.json([
    { id: 1, nome: 'Odontológico' },
    { id: 2, nome: 'Estético' },
    { id: 3, nome: 'Fisioterapia' }
  ]);
});

app.get('/api/clinicas', async (req, res) => {
  try {
    const { setor, cidade, bairro, latitude, longitude } = req.query;
    
    let query = {};
    if (setor) query['setores'] = setor;
    if (cidade) query['endereco.cidade'] = cidade;
    if (bairro) query['endereco.bairro'] = bairro;

    let clinicas;
    if (latitude && longitude) {
      // Busca por proximidade usando coordenadas
      clinicas = await Clinica.find({
        ...query,
        localizacao: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: 10000 // 10km
          }
        }
      });
    } else {
      clinicas = await Clinica.find(query);
    }

    res.json(clinicas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clínicas' });
  }
});

app.get('/api/mensagens/:clinicaId', async (req, res) => {
  try {
    const mensagens = await Mensagem.find({ clinicaId: req.params.clinicaId })
      .sort({ timestamp: 1 });
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

// Enviar mensagem para a clínica
app.post('/api/mensagens', async (req, res) => {
  try {
    const { clinicaId, remetente, texto } = req.body;
    if (!clinicaId || !remetente || !texto) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }
    const mensagem = await Mensagem.create({ clinicaId, remetente, texto });
    return res.status(201).json({ message: 'Mensagem enviada com sucesso!', mensagem });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
});

// Cadastro de clínica
app.post('/api/auth/cadastro-clinica', async (req, res) => {
  try {
    const { nome, email, senha, telefone, cnpj, cep } = req.body;
    if (!nome || !email || !senha || !telefone || !cnpj || !cep) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }
    const clinicaExistente = await Clinica.findOne({ $or: [{ email }, { cnpj }] });
    if (clinicaExistente) {
      return res.status(400).json({ error: 'E-mail ou CNPJ já cadastrado.' });
    }
    const hash = await bcrypt.hash(senha, 10);
    const clinica = await Clinica.create({ nome, email, senha: hash, telefone, cnpj, cep });
    return res.status(201).json({ message: 'Clínica cadastrada com sucesso!' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar clínica.' });
  }
});

// Cadastro de paciente
app.post('/api/auth/cadastro-paciente', async (req, res) => {
  try {
    const { nome, email, senha, telefone, cpf, cep } = req.body;
    if (!nome || !email || !senha || !telefone || !cpf || !cep) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }
    const pacienteExistente = await Paciente.findOne({ $or: [{ email }, { cpf }] });
    if (pacienteExistente) {
      return res.status(400).json({ error: 'E-mail ou CPF já cadastrado.' });
    }
    const hash = await bcrypt.hash(senha, 10);
    const paciente = await Paciente.create({ nome, email, senha: hash, telefone, cpf, cep });
    return res.status(201).json({ message: 'Paciente cadastrado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar paciente.' });
  }
});

// Login (clínica ou paciente)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    // Tenta encontrar o usuário em ambas as coleções
    let user = await Clinica.findOne({ email });
    let tipo = 'clinica';
    
    if (!user) {
      user = await Paciente.findOne({ email });
      tipo = 'paciente';
    }

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) {
      return res.status(400).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign({ id: user._id, tipo }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, nome: user.nome, email: user.email, tipo } });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

// Socket.io para chat
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('join-chat', (clinicId) => {
    socket.join(clinicId);
  });

  socket.on('send-message', async (data) => {
    try {
      const mensagem = new Mensagem({
        clinicaId: data.clinicId,
        remetente: data.sender,
        texto: data.text
      });
      await mensagem.save();
      
      io.to(data.clinicId).emit('receive-message', data);
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

app.use('/api', require('./server/routes/chatRoutes'));

// Servir React em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 