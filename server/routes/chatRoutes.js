const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');
// const Clinica = require('../models/Clinica'); // Caso precise buscar dados da clínica
// const User = require('../models/User'); // Caso precise buscar dados do usuário

// Middleware de autenticação (mock para exemplo)
const auth = (req, res, next) => {
  // Em produção, use JWT real. Aqui, simula usuário logado com id fixo.
  req.user = { id: '6633e1b2f1a2b3c4d5e6f7a0' };
  next();
};

// Listar conversas do usuário
router.get('/chats', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user.id })
      .populate('clinica', 'nome setor imagem')
      .sort('-updatedAt');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar conversas.' });
  }
});

// Iniciar nova conversa (ou retornar existente)
router.post('/chats', auth, async (req, res) => {
  const { clinicaId } = req.body;
  try {
    let chat = await Chat.findOne({ users: req.user.id, clinica: clinicaId });
    if (!chat) {
      chat = await Chat.create({ users: [req.user.id], clinica: clinicaId });
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao iniciar conversa.' });
  }
});

// Listar mensagens de uma conversa
router.get('/chats/:chatId/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .sort('createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mensagens.' });
  }
});

// Enviar mensagem em uma conversa
router.post('/chats/:chatId/messages', auth, async (req, res) => {
  const { text } = req.body;
  try {
    const message = await Message.create({
      chat: req.params.chatId,
      sender: req.user.id,
      text
    });
    // Atualiza lastMessage e updatedAt do chat
    await Chat.findByIdAndUpdate(req.params.chatId, {
      lastMessage: text,
      updatedAt: new Date()
    });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
});

module.exports = router; 