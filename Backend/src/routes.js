const { Router } = require('express');
const incidenteController = require('./controllers/incidenteController');


const routes = Router();

routes
.get('/incidente', incidenteController.index)
.post('/incidente', incidenteController.store) 
.get('/incidente/:grupo', incidenteController.searchByGroup)
.put('/incidente/:numero', incidenteController.update)
.delete('/incidente/:numero', incidenteController.delete)
.delete('/incidente/d/:_id', incidenteController.deleteById)

module.exports = routes;