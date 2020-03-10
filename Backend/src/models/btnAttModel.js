const mongoose = require('mongoose');

const btnSchema = new mongoose.Schema({
  data: String,
})

module.exports = mongoose.model('btnAtt', btnSchema);