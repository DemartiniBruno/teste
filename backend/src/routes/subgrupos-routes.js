const { Router } = require('express');
const controller = require('../controllers/subgrupos-controller')

const subgruposRouters = Router();

subgruposRouters.post('/subgruposadm', controller.cadastrarSubgrupoAdm)
subgruposRouters.post('/subgrupos', controller.cadastrarSubgrupo)
subgruposRouters.post('/acessarsubgrupo', controller.acessarSubgrupo)

module.exports = subgruposRouters