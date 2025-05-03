const mongoose = require('mongoose');

const clinicaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  telefone: String,
  cnpj: {
    type: String,
    required: true,
    unique: true
  },
  cep: String,
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  setores: [{
    type: String
  }],
  tratamentos: [{
    setor: String,
    nome: String
  }],
  horarioFuncionamento: {
    segunda: { abertura: String, fechamento: String },
    terca: { abertura: String, fechamento: String },
    quarta: { abertura: String, fechamento: String },
    quinta: { abertura: String, fechamento: String },
    sexta: { abertura: String, fechamento: String },
    sabado: { abertura: String, fechamento: String },
    domingo: { abertura: String, fechamento: String }
  },
  site: String,
  criadoEm: { type: Date, default: Date.now }
});

// Índice para busca geográfica
clinicaSchema.index({ localizacao: '2dsphere' });

module.exports = mongoose.model('Clinica', clinicaSchema); 