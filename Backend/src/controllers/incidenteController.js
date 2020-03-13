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
      migrado,
      grupoName,
      grupo,
      dta,
      dtaUpd,
      des,
      res,
      rdm,
      status,
      responsavel,
      comentario
    } = request.body;

    //Busca pelo numero do incidente para ver se já existe
    let inc = await incidente.findOne({ numero });  
    
    
    //Se não existe, cria o registro no banco de dados
    if(!inc){
      await incidente.create({
        numero,
        migrado,
        grupoName,
        grupo,
        dta,
        dtaUpd,
        des,
        res,
        rdm,
        status,
        responsavel,
        comentario
      }) 

    }
    else{
      console.log('Registro já existe')
      return response.json({msg:'Registro já existe'});
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
  async update(req, response) {
    const { numero } = req.params;
    const inc = await incidente.findOne({numero});
    const { 
      migrado,
      grupoName,
      grupo,
      dta,
      dtaUpd,
      des,
      res,
      rdm,
      status,
      responsavel,
      comentario,
      ...rest
    } = req.body;
    rest.numero = numero;
    if (des)
      rest.des = des;
    if (grupo)
      rest.grupo = grupo;
    if (comentario)
      rest.comentario = comentario;
    if (rdm)
      rest.rdm = rdm;
    if (status)
      rest.status = status;
    if (res)
      rest.res = res;
    if (responsavel)
      rest.responsavel = responsavel;
    if (dta)
      rest.dta = dta
    if (dtaUpd)
      rest.dtaUpd = dtaUpd
    if (grupoName)
      rest.grupoName = grupoName
    const newIncidente = await incidente.updateOne({ numero }, {
        ...rest
    });

    return response.json({
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