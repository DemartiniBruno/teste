const { Router } = require('express');
const controller = require('../controllers/despesas-controller')

const despesasRouters = Router();

despesasRouters.post('/despesas', controller.cadastraDespesa)
despesasRouters.get('/despesas/:subgrupo_id', controller.consultaDespesas)
despesasRouters.get('/despesas/grupo/:grupo_id', controller.consultaDespesas_grupo)
despesasRouters.get('/despesas/subgrupo/:subgrupo_id', controller.valor_rateado_subgrupo)
// NÃO UTILIZANDO A EDIÇÃO POR ENQUANTO
// despesasRouters.put('/grupos/:grupo_id/despesas/:despesa_id', controller.editarDespesa)



module.exports = despesasRouters