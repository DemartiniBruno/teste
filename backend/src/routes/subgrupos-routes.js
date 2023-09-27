const { Router } = require('express');
const controller = require('../controllers/subgrupos-controller')

const subgruposRouters = Router();

// subgruposRouters.post('/:grupo_id/subgruposadm', controller.cadastrarSubgrupoAdm)
subgruposRouters.post('/:grupo_id/subgrupos/', controller.cadastrarSubgrupo)
subgruposRouters.post('/:grupo_id/subgrupos/acessar/:subgrupo_id', controller.acessarSubgrupo)
subgruposRouters.get('/:grupo_id/subgrupos/:id', controller.visualizarSubgrupo)
// subgruposRouters.get('/subgrupos', controller.visualizarTodosSubgrupo)

module.exports = subgruposRouters