const axios = require('axios');
const incidente = require('../models/incidenteModel');

module.exports = {
  /*************************************  
 *  Método para buscar todos os incidentes
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async index(request, response){
   const incidentes = await incidente.find();
   
   return response.json(incidentes);
  },
/*************************************  
 *  Método de gravação de incidentes
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async store (request, response) {
    //Espera a request via JSON
    const { 
      numero, 
      grupo, 
      descricao, 
      comentario 
    } = request.body;

    //Busca pelo numero do incidente para ver se já existe
    let inc = await incidente.findOne({ numero });  
    
    //Se não existe, cria o registro no banco de dados
    if(!inc){
      const inc = await incidente.create({
        numero,
        descricao,
        grupo,
        comentario
      }) 
    }
    //Retorna uma resposta em JSON
    return response.json(inc);
  },

  async searchByGroup(req, res) {
    const { grupo } = req.params;
    const inc = await incidente.find({grupo});
    
    return res.json(inc === null ? {} : inc);
  },

  async update(req, res) {
    const { numero } = req.params;
    const inc = await incidente.findOne({numero});
    const { 
      descricao,
      grupo,
      comentario,
      ...rest
    } = req.body;
    rest.numero = numero;
    if (descricao)
      rest.descricao = descricao;
    if (grupo)
      rest.grupo = grupo;
    if (comentario)
      rest.comentario = comentario;
    const newIncidente = await incidente.updateOne({ numero }, {
        ...rest
    });

    return res.json({
        modifiedCount: newIncidente.nModified,
        ok: newIncidente.ok
    });
  },

  async delete(req, res) {
    const { numero } = req.params;
    await incidente.deleteOne({ numero });
    return res.json();
  },
  async deleteById(req, res) {
    const { _id } = req.params;
    await incidente.deleteOne({ _id });
    return res.json();
  },
};



//5e3dd18158e33d224640908a