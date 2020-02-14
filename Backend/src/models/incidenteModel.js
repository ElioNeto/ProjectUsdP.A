const mongoose = require('mongoose');

const incidenteSchema = new mongoose.Schema({
  numero: String,
  grupo: String,
  descricao: String,
  comentario: String,
  rdm: String,
  responsavel: String,
  status: String,
  resumo: String,
  abertura: String,
  atualizacao: String,
})

module.exports = mongoose.model('Incidente', incidenteSchema);