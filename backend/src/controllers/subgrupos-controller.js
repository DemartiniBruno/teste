const db = require('../db/db-create');
const global_controller = require('./global-controller')

//Nessa função vou receber um array com os dados do subgrupo e usar o forEach para criar cada um dos subgrupos
const cadastrarSubgrupo = async (req, res) => {
    try {
        req.body.forEach(async subgrupo => {

            const db_subgrupo = await db.Subgrupo.create({
                nome: subgrupo.nome,
                descricao: subgrupo.descricao,
                grupo_id: req.params.grupo_id,
                //Vou definir quais são os parametros do subgrupo individualmente porque puxo o parametro da URL e não só do body do request
                //Como se trata de vários subgrupos de um único grupo, então o parametro do grupo_id vem pela URL mesmo, não preciso passar pelo body
                codigo_acesso: global_controller.codigo_acesso()[0]
                //Aqui vou chamar a função codigo_acesso para gerar um código unico de identificação
            })

            console.log(`Subgrupo ${subgrupo.nome} - ${subgrupo.descricao} criado com sucesso`)

            //Quando o administrador for morador de um dos apartamentos, ao marcar a checkbox de morador deve ser enviado no body a informação: "permissao_adm: true"
            if (subgrupo.permissao_adm) {

                const usuario = global_controller.informacoes_usuario(req.headers.authorization)

                criarRelacao(usuario, db_subgrupo, subgrupo.permissao_adm);

                console.log(`O administrador ${usuario.usuario.nome} é morador do subgrupo ${subgrupo.nome} - ${subgrupo.descricao}`)
            }
        })

        res.json({
            status: 200,

            mensagem: "Apartamentos criados com sucesso"
            // ----> ANALISAR QUAL MELHOR RETORNO PARA ESSA SITUAÇÃO <----
        })

    } catch (error) {
        res.json({ status: 500, menasgem: error.message })
    }
}

const acessarSubgrupo = async (req, res) => {
    console.log(req.body)

    try {
        const usuario = global_controller.informacoes_usuario(req.headers.authorization)
        const codigo_acesso = req.body.codigo_acesso
        const subgrupo = await db.Subgrupo.findOne({
            where: {
                codigo_acesso: codigo_acesso
            }
        })

        if (subgrupo) {

            criarRelacao(usuario, subgrupo, req.body.permissao_adm)

            res.json({ status: 200, mensagem: "Vinculo criado" })
        } else {
            throw new Error('Apartamento não encontrado')
        }

    } catch (error) {
        res.json({ status: 500, mensagem: error.message })
    }
}

const criarRelacao = async (usuario, subgrupo, permissao_adm) => {

    if (permissao_adm) {
        await db.ErUsuarioDoSubgrupo.create({
            subgrupo_id: subgrupo.id,
            usuario_id: usuario.usuario.id,
            permissao_adm: true
        })
    } else {
        await db.ErUsuarioDoSubgrupo.create({
            subgrupo_id: subgrupo.id,
            usuario_id: usuario.usuario.id,
        })
    }
}

const visualizarSubgrupo = async (req, res) => {
    const usuario = global_controller.informacoes_usuario(req.headers.authorization)
    const relacao = await db.ErUsuarioDoSubgrupo.findOne({
        where: {
            usuario_id: usuario.usuario.id,
        }
    })

    var subgrupo

    if (relacao.permissao_adm) {
        subgrupo = await db.Subgrupo.findOne({
            where: {
                id: req.params.subgrupo_id
            }
        })
    } else {
        subgrupo = await db.Subgrupo.findOne({
            include: {
                required: true,
                model: db.ErUsuarioDoSubgrupo,
                attributes: [],
                where: {
                    usuario_id: usuario.usuario.id,
                }
            },
            where: {
                id: req.params.subgrupo_id
            }
        })
    }

    res.json(subgrupo)
}

const editarSubgrupo = async (req, res) => {
    try {

        var editarsubgrupo = await db.Subgrupo.findOne({
            where: {
                id: req.params.subgrupo_id
            }
        })
        editarsubgrupo.nome = req.body.nome
        editarsubgrupo.descricao = req.body.descricao
        await editarsubgrupo.save({ fields: ['nome', 'descricao'] })
        res.json(editarsubgrupo)
    } catch (error) {
        res.json(error.message)

    }
}


module.exports = {
    cadastrarSubgrupo,
    acessarSubgrupo,
    visualizarSubgrupo,
    editarSubgrupo
} 