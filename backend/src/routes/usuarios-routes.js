const { Router } = require('express');
const controller = require('../controllers/usuarios-controller')

const usuariosRouters = Router();

usuariosRouters.post('/usuarios', controller.cadastrarUsuario)
usuariosRouters.post('/login', controller.login)
usuariosRouters.get('/relacao', controller.relacao)

module.exports = usuariosRouters