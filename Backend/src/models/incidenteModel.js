const mongoose = require('mongoose');

const incidenteSchema = new mongoose.Schema({
  numero: String,
  migrado: String,
  grupoName: String,
  grupo: String,
  dta: String,
  dtaUpd: String,
  des: String,
  res: String,
  rdm: String,
  status: String,
  responsavel: String,
  comentario: String,
})

module.exports = mongoose.model('Incidente', incidenteSchema);