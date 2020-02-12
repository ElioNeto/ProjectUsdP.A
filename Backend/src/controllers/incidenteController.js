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
      comentario,
      rdm,
      status,
      resumo,
      responsavel,
      abertura, 
    } = request.body;

    //Busca pelo numero do incidente para ver se já existe
    let inc = await incidente.findOne({ numero });  
    
    
    //Se não existe, cria o registro no banco de dados
    if(!inc){
      const inc = await incidente.create({
        numero,
        descricao,
        grupo,
        comentario,
        rdm,
        status,
        resumo,
        responsavel,
        abertura 
      }) 

    }
    //Retorna uma resposta em JSON
    return response.json(inc);
  },
/*************************************  
 *  Método de busca por grupo
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async searchByGroup(req, res) {
    const { grupo } = req.params;
    const inc = await incidente.find({grupo});
    
    return res.json(inc === null ? {} : inc);
  },

/*************************************  
 *  Método de busca por número
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async searchByNumber(req, res) {
    const { numero } = req.params;
    const inc = await incidente.find({numero});
    
    return res.json(inc === null ? {} : inc);
  },
  
/*************************************  
 *  Método de atualização de registro
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async update(req, res) {
    const { numero } = req.params;
    const inc = await incidente.findOne({numero});
    const { 
      descricao,
      grupo,
      comentario,
      rdm,
      status,
      responsavel,
      resumo,
      abertura,
      ...rest
    } = req.body;
    rest.numero = numero;
    if (descricao)
      rest.descricao = descricao;
    if (grupo)
      rest.grupo = grupo;
    if (comentario)
      rest.comentario = comentario;
    if (rdm)
      rest.rdm = rdm;
    if (status)
      rest.status = status;
    if (resumo)
      rest.resumo = resumo;
    if (responsavel)
      rest.responsavel = responsavel;
    if (abertura)
      rest.abertura = abertura
    const newIncidente = await incidente.updateOne({ numero }, {
        ...rest
    });

    return res.json({
        modifiedCount: newIncidente.nModified,
        ok: newIncidente.ok
    });
  },

/*************************************  
 *  Método de exclusão
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async delete(req, res) {
    const { numero } = req.params;
    await incidente.deleteOne({ numero });
    return res.json();
  },

/*************************************  
 *  Método de exclusão por ID
 *  Autor: Elio Neto
 *  Versão: 0.1
 ************************************/
  async deleteById(req, res) {
    const { _id } = req.params;
    await incidente.deleteOne({ _id });
    return res.json();
  },
};