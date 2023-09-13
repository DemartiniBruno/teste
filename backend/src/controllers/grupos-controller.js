const db = require('../db/db-create');

const cadastrarGrupo = async (req, res) => {
    const grupo = await db.Grupo.create(req.body)
    res.json(grupo)
}

module.exports = {
    cadastrarGrupo
}