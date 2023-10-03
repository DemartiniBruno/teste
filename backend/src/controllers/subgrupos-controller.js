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
                //Aqui vou chamar a função codig_acesso para gerar um código unico de identificação
            })

            console.log(`Subgrupo ${subgrupo.nome} - ${subgrupo.descricao} criado com sucesso`)

            //Quando o administrador for morador de um dos apartamentos, ao marcar a checkbox de morador deve ser enviado no body a informação: "permissao_adm: true"
            if (subgrupo.permissao_adm) {

                const usuario = global_controller.informacoes_usuario(req.headers.authorization)

                await db.ErUsuarioDoSubgrupo.create({
                    subgrupo_id: db_subgrupo.id,
                    usuario_id: usuario.usuario.id,
                    permissao_adm: true
                })

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

    try {
        const usuario = global_controller.informacoes_usuario(req.headers.authorization)
        const codigo_acesso = req.body.codigo_acesso
        const subgrupo = await db.Subgrupo.findOne({
            where: {
                codigo_acesso: codigo_acesso
            }
        })

        // console.log(usuario)
        console.log(usuario.usuario.id)


        if(subgrupo){
            // console.log("testa")
            await db.ErUsuarioDoSubgrupo.create({
                subgrupo_id: subgrupo.id,
                usuario_id: usuario.usuario.id
            })
            res.json({mensagem: "Vinculo criado"})
        } else {
            throw new Error('Apartamento não encontrado')
        }
        
    } catch (error) {
        res.json(error.message)
    }



    // res.json({ mensagem: 'Usuario vinculado ao subgrupo' })
}

//Funções GET para visualização de informações

const visualizarSubgrupo = async (req, res) => {
    const usuario = global_controller.informacoes_usuario(req.headers.authorization)

    const subgrupo = await db.Subgrupo.findOne({
        include: {
            required: true,
            model: db.ErUsuarioDoSubgrupo,
            attributes: [],
            where: {
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