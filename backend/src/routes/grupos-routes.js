const { Router } = require('express');
const controller = require('../controllers/grupos-controller')

const gruposRouters = Router();

gruposRouters.post('/grupos', controller.cadastrarGrupo)

module.exports = gruposRouters