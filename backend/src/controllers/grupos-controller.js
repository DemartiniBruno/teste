const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

const cadastrarGrupo = async (req, res) => {
    try {
        const grupo = await db.Grupo.create(req.body)
        res.json(grupo)
    } catch (error) {
        res.json(error.message)
    }
}

const visualizarGrupos = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    try {
        const grupos = await db.Grupo.findAll({
            attributes: ['id', 'nome'],
            include: {
                required: true,
                model: db.Subgrupo,
                attributes: [],
                include: {
                    required: true,
                    model: db.ErUsuarioDoSubgrupo,
                    attributes: [],
                    where: {
                        usuario_id: usuario.usuario.id
                    }
                }
            }
        })
        res.json(grupos)
    } catch (error) {
        res.json(error.message)
    }
}

// const visualizarSubgrupos = async (req, res) => {
//     const subgrupos = await db.Grupo.findAll({
//         attributes: ['id','nome'],
//         include: {
//             model: db.Subgrupo
//         },
//         where: {
//             id: req.params.id
//         }
//     })
//     res.json(subgrupos)
// }

// const visualizarGruposPorUsuario = async (req, res) => {
//     const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

//     const subgrupos = await db.Grupo.findAll({
//         // attributes: ['id','nome'],
//         include: {
//             model: db.Subgrupo,
//             include: {
//                 model: db.ErUsuarioDoSubgrupo,
//                 where: {
//                     usuario_id: usuario.usuario.id
//                 }
//             }
//         },
//     })
//     res.json(subgrupos)
// }

const visualizarGruposEspecifico = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    try {
        const grupos = await db.Grupo.findAll({
            attributes: ['id', 'nome'],
            include: {
                required: true,
                model: db.Subgrupo,
                include: {
                    required: true,
                    model: db.ErUsuarioDoSubgrupo,
                    attributes: [],
                    where: {
                        usuario_id: usuario.usuario.id
                    }
                }
            },
            where:{
                id: req.params.id
            }
        })
        if(grupos == 0){
            throw new Error('Grupo errado parça')
        }
        res.json(grupos)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    cadastrarGrupo,
    visualizarGrupos,
    visualizarGruposEspecifico,
}