const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

//Função para criar um código aleatório de 5 digitos para ser vinculado ao apartamento
const codigo_acesso = () => {
    //Talvez usar a biblioteca code_random
    try {
        const codigo = Math.floor(Math.random() * 100000);
        if (codigo != db.Subgrupo.findOne({
            where: {
                codigo_acesso: codigo
            }
        })) {
            return codigo
        } else {
            const novo_codigo = codigo_acesso()
            return novo_codigo
        }
    } catch (error) {
        console.log(error.message)
    }
}

const informacoes_usuario = (usuario_codificado) => {
    return usuario_decodificado = jsonWebToken.decode(usuario_codificado, '123')
}

// ALÉM DA FUNÇÃO DE INFORMACAO_USUARIO CRIAR A FUNÇÃO DE CRIAR ACESSO GENERICA PARA QUE EU REUTILIZE QUANDO CADASTRAR O ADMINISTRADOR

// const codigo_acesso = () => {

//         var codigo_teste=12345
//         var codigo = Math.floor(Math.random() * 100000);
//         if(contador == 0){
//             console.log(`Vamos redefinir o código ${codigo}`)
//             codigo = codigo_teste
//             console.log(`codigo redefinido ${codigo}`)
//             contador=1
//             console.log(`aumentando contador ${contador}`)
//         }
//         console.log(`Criando código ${codigo}`)
//         if(codigo!=codigo_teste){
//             console.log(`Codigo unico`)
//             return codigo
//         } else{
//             console.log(`Codigo duplicado`)
//             const novo_codigo = codigo_acesso()
//             return novo_codigo
//         }

// }


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
                codigo_acesso: codigo_acesso()
                //Aqui vou chamar a função codig_acesso para gerar um código unico de identificação
            })

            console.log(`Subgrupo ${subgrupo.nome} - ${subgrupo.descricao} criado com sucesso`)

            //Quando o administrador for morador de um dos apartamentos, ao marcar a checkbox de morador deve ser enviado no body a informação: "permissao_adm: true"
            if (subgrupo.permissao_adm) {

                const usuario = informacoes_usuario(req.headers.authorization)

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
        const usuario = informacoes_usuario(req.headers.authorization)
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
    const usuario = informacoes_usuario(req.headers.authorization)

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