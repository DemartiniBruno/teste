const db = require('../db/db-create');

const cadastraDespesa = async (req, res) => {
    const despesa = await db.Grupo.create(req.body)
    res.json(grupo)
}

module.exports = {
    cadastraDespesa
}