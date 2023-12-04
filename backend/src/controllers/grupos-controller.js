const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');
const global_controller = require('./global-controller')


const cadastrarGrupo = async (req, res) => {
    try {
        const grupo = await db.Grupo.create(req.body)
        res.json({ status: 200, mensagem: 'Sucesso', grupo_id: grupo.id })
    } catch (error) {
        res.json({ status: 200, mensagem: error.message })
    }
}

const visualizarSubgrupos = async (req, res) => {

    const usuario = global_controller.informacoes_usuario(req.headers.authorization)

    const subgrupos = await db.Grupo.findAll({
        attributes: ['id', 'nome'],
        include: {
            model: db.Subgrupo,
            include: {
                model: db.ErUsuarioDoSubgrupo,
                required: false,
                where: {
                    usuario_id: usuario.usuario.id
                }
            }
        },
        where: {
            id: req.params.grupo_id
        }
    })
    res.json(subgrupos)
}

const editarGrupo = async (req, res) => {
    try {
        var editargrupo = await db.Grupo.findOne({
            where: {
                id: req.params.grupo_id
            }
        })
        editargrupo.nome = req.body.nome
        editargrupo.descricao = req.body.descricao
        await editargrupo.save({ fields: ['nome', 'descricao'] });
        res.json(editargrupo)


    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    cadastrarGrupo,
    visualizarSubgrupos,
    editarGrupo
}