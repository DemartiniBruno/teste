const jsonWebToken = require('jsonwebtoken');
const db = require('../db/db-create');

const CodeGenerator = require('node-code-generator')
const generator = new CodeGenerator
var pattern = 'AP###'
var howMany = 1;
var options = {}

//Função para criar um código aleatório de 5 digitos para ser vinculado ao apartamento
const codigo_acesso = () => {
    //Talvez usar a biblioteca code_random
    try {
        const codigo = generator.generateCodes(pattern, howMany, options);

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
//organizando pensamentos
//const editaDados = (req, res) => {
//    const dados = req.body.findAll();
 //   console.log(dados)
 //   const informacoes = db.dados.findAll();
//}
module.exports = {
    codigo_acesso,
    informacoes_usuario,
    //editaDados
}