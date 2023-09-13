const { Router } = require('express');
const controller = require('../controllers/subgrupos-controller')

const subgruposRouters = Router();

subgruposRouters.post('/subgrupos', controller.cadastrarSubgrupo)

module.exports = subgruposRouters