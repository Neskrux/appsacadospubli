const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: String,
  cpf: { type: String, required: true, unique: true },
  cep: String,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paciente', pacienteSchema); 