const { Router } = require('express');
const controller = require('../controllers/grupos-controller')

const gruposRouters = Router();

gruposRouters.post('/grupos', controller.cadastrarGrupo)
gruposRouters.get('/grupos', controller.visualizarGrupos)
gruposRouters.get('/grupos/:id', controller.visualizarGruposEspecifico)

module.exports = gruposRouters