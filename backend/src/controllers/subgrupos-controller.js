const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

const cadastrarSubgrupoAdm = async (req, res) => {
    const subgrupo = await db.Subgrupo.create(req.body)

    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
        permissao_adm: true,
        subgrupo_id: subgrupo.id,
        usuario_id: usuario.usuario.id
    })

    res.json(subgrupo)

}

const cadastrarSubgrupo = async (req, res) => {
    const subgrupo = await db.Subgrupo.create(req.body)

    res.json(subgrupo)
}

const acessarSubgrupo = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
        subgrupo_id: req.body.subgrupo_id,
        usuario_id: usuario.usuario.id
    })

    res.json({mensagem:'Usuario vinculado ao subgrupo'})
}

module.exports = {
    cadastrarSubgrupoAdm,
    cadastrarSubgrupo,
    acessarSubgrupo
}