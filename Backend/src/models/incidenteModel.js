const mongoose = require('mongoose');

const incidenteSchema = new mongoose.Schema({
  numero: String,
  grupo: String,
  descricao: String,
  comentario: String,
})

module.exports = mongoose.model('Incidente', incidenteSchema);