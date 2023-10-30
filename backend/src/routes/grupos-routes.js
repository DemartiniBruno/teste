const { Router } = require('express');
const controller = require('../controllers/grupos-controller')

const gruposRouters = Router();

gruposRouters.post('/grupos', controller.cadastrarGrupo)
gruposRouters.get('/grupos/:id/subgrupos', controller.visualizarSubgrupos)
gruposRouters.put('/grupos/:grupo_id', controller.editarGrupo)
// gruposRouters.get('/grupos/:id/subgrupos', controller.meuSubgrupo)

module.exports = gruposRouters