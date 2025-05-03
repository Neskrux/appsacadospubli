const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  clinicaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinica',
    required: true
  },
  remetente: {
    type: String,
    required: true,
    enum: ['paciente', 'clinica']
  },
  texto: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mensagem', mensagemSchema); 