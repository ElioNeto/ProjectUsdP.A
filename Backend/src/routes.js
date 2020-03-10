const { Router } = require('express');
const incidenteController = require('./controllers/incidenteController');
const btnAttController = require('./controllers/btnAttController')


const routes = Router();

routes
.get('/incidente', incidenteController.index)
.get('/incidente/:grupo', incidenteController.searchByGroup)
.get('/incidente/one/:numero', incidenteController.searchByNumber)
.post('/incidente', incidenteController.store) 
.put('/incidente/:numero', incidenteController.update)
.delete('/incidente/:numero', incidenteController.delete)
.delete('/incidente/d/:_id', incidenteController.deleteById)

.get('/att', btnAttController.index)
.post('/att', btnAttController.store)

module.exports = routes;
