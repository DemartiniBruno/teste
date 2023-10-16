const { Router } = require('express');
const controller = require('../controllers/despesas-controller')

const despesasRouters = Router();

despesasRouters.post('/despesas', controller.cadastraDespesa)

module.exports = despesasRouters