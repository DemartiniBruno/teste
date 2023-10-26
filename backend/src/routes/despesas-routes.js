const { Router } = require('express');
const controller = require('../controllers/despesas-controller')

const despesasRouters = Router();

despesasRouters.post('/despesas', controller.cadastraDespesa)
despesasRouters.put('/grupos/:grupo_id/despesas/:despesa_id', controller.editarDespesa)

module.exports = despesasRouters