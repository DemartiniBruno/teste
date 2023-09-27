const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

// const cadastrarSubgrupoAdm = async (req, res) => {
//     const subgrupo = await db.Subgrupo.create({
//         nome: req.body.nome,
//         descricao: req.body.descricao,
//         grupo_id: req.params.grupo_id
//     })

//     const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

//     const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
//         permissao_adm: true,
//         subgrupo_id: subgrupo.id,
//         usuario_id: usuario.usuario.id
//     })

//     res.json(subgrupo) 

// }

// const cadastrarSubgrupo = async (req, res) => {
//     const subgrupo = await db.Subgrupo.create({
//         nome: req.body.nome,
//         descricao: req.body.descricao,
//         grupo_id: req.params.grupo_id
//     })

//     res.json(subgrupo)
// }


const cadastrarSubgrupo = async (req, res) => {

    try {
        // const subgrupos_array = req.body

        // subgrupos_array.forEach(async subgrupo => {
        //     const db_subgrupo = await db.Subgrupo.create(subgrupo)
        //     console.log(`Subgrupo ${db_subgrupo.nome} - ${db_subgrupo.descricao} criado com sucesso`)
        // });
        req.body.forEach(async subgrupo => {
            const db_subgrupo = await db.Subgrupo.create({
                nome: subgrupo.nome,
                descricao: subgrupo.descricao,
                grupo_id: req.params.grupo_id
            })
            console.log("Criado o subgrupo")
        })

        res.json({
            mensagem: "Criado"
        })

    } catch (error) {
        
    }

    // const subgrupo = await db.Subgrupo.create({
    //     nome: req.body.nome,
    //     descricao: req.body.descricao,
    //     grupo_id: req.params.grupo_id
    // })
    //
    // res.json(subgrupo)
}

// implementação

const acessarSubgrupo = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
        subgrupo_id: req.params.subgrupo_id,
        usuario_id: usuario.usuario.id
    })

    res.json({ mensagem: 'Usuario vinculado ao subgrupo' })
}

const visualizarSubgrupo = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const subgrupo = await db.Subgrupo.findOne({
        include:{
            required: true,
            model: db.ErUsuarioDoSubgrupo,
            attributes: [],
            where:{
                usuario_id: usuario.usuario.id
            }
        },
        where: {
            id: req.params.id
        }
    })

    res.json(subgrupo)
}

module.exports = {
    // cadastrarSubgrupoAdm,
    cadastrarSubgrupo,
    acessarSubgrupo,
    visualizarSubgrupo
} 