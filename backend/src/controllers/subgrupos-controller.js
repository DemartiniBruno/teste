const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

//Nessa função vou receber um array com os dados do subgrupo e usar o forEach para criar cada um dos subgrupos
const cadastrarSubgrupo = async (req, res) => {
    try {
        req.body.forEach(async subgrupo => {

            const db_subgrupo = await db.Subgrupo.create({
                nome: subgrupo.nome,
                descricao: subgrupo.descricao,
                grupo_id: req.params.grupo_id
                //Vou definir quais são os parametros do subgrupo individualmente porque puxo o parametro da URL e não só do body do request
                //Como se trata de vários subgrupos de um único grupo, então o parametro do grupo_id vem pela URL mesmo, não preciso passar pelo body
            })

            console.log(`Subgrupo ${subgrupo.nome} - ${subgrupo.descricao} criado com sucesso`)


            //Quando o administrador for morador de um dos apartamentos, ao marcar a checkbox de morador deve ser enviado no body a informação: "permissao_adm: true"
            if(subgrupo.permissao_adm){

                const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

                const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
                    subgrupo_id: req.params.subgrupo_id,
                    usuario_id: usuario.usuario.id,
                    permissao_adm: true
                })

                console.log(`Subgrupo ${subgrupo.nome} - ${subgrupo.descricao} criado com sucesso`)

                console.log(`O administrador ${usuario.usuario.nome} é morador do subgrupo ${subgrupo.nome} - ${subgrupo.descricao}`)
            }
        })

        res.json({
            mensagem: "Apartamentos criados com sucesso"
            // ----> ANALISAR QUAL MELHOR RETORNO PARA ESSA SITUAÇÃO <----
        })

    } catch (error) {
        res.json(error.message)
    }
}

const acessarSubgrupo = async (req, res) => {
    const usuario = await jsonWebToken.decode(req.headers.authorization, '123')

    const er_subgrupo = await db.ErUsuarioDoSubgrupo.create({
        subgrupo_id: req.params.subgrupo_id,
        usuario_id: usuario.usuario.id
    })

    res.json({ mensagem: 'Usuario vinculado ao subgrupo' })
}

//Funções GET para visualização de informações

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
    cadastrarSubgrupo,
    acessarSubgrupo,
    visualizarSubgrupo
} 