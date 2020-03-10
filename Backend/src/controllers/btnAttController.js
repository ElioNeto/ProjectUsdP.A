const axios = require('axios');
const btn = require('../models/btnAttModel');

module.exports = {
/*************************************  
 *  Método para buscar todos os registros do botão de atualização
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async index(request, response){
   const btns = await btn.find();
   
   return response.json(btns);
  },
/*************************************  
 *  Método para Gravação de dados
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async store (request, response) {
    const { 
      data
    } = request.body;
    const btn = await incidente.create({
      data
    }) 
    return response.json(btn);
  },
}