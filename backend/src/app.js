const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authMiddleware = require('./models/middleware')

const usuariosRouters = require('./routes/usuarios-routes')
const gruposRouters = require('./routes/grupos-routes')
const subgruposRouters = require('./routes/subgrupos-routes')
const despesasRouters = require('./routes/despesas-routes')

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/', usuariosRouters)
app.use(authMiddleware)
app.use('/', gruposRouters)
app.use('/grupos/', subgruposRouters)
app.use('/', despesasRouters)

// console.log('testeGit')

module.exports = app;