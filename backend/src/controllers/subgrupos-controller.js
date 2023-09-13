const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

const cadastrarSubgrupo = async (req, res) => {
    const subgrupo = await db.Subgrupo.create(req.body)

    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
        permissao_adm: true,
        id_subgrupo: subgrupo.id,
        id_usuario: usuario.usuario.id
    })

    res.json(subgrupo)

}

module.exports = {
    cadastrarSubgrupo
}