const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  clinica: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica', required: true },
  lastMessage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema); 