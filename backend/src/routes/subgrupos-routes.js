const { Router } = require('express');
const controller = require('../controllers/subgrupos-controller')

const subgruposRouters = Router();

subgruposRouters.post('/:grupo_id/subgrupos/', controller.cadastrarSubgrupo)
subgruposRouters.post('/acessar/', controller.acessarSubgrupo)
subgruposRouters.get('/subgrupo/:subgrupo_id', controller.visualizarSubgrupo)
// NÃO UTILIZANDO A EDIÇÃO POR ENQUANTO
// subgruposRouters.put('/:grupo_id/subgrupo/:subgrupo_id', controller.editarSubgrupo)

module.exports = subgruposRouters