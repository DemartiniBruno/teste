const { Router } = require('express');
const controller = require('../controllers/grupos-controller')

const gruposRouters = Router();

gruposRouters.post('/grupos', controller.cadastrarGrupo)
gruposRouters.get('/grupos/:grupo_id', controller.visualizarSubgrupos)
// NÃO UTILIZANDO A EDIÇÃO POR ENQUANTO
// gruposRouters.put('/grupos/:grupo_id', controller.editarGrupo)

module.exports = gruposRouters