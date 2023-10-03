const jsonWebToken = require('jsonwebtoken');


//Função para criar um código aleatório de 5 digitos para ser vinculado ao apartamento
const codigo_acesso = () => {
    //Talvez usar a biblioteca code_random


    try {
        const codigo_teste = getRandomCode(5, {
            letter: true,
            digits: true
        })

        console.log(codigo_teste)
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


module.exports = {
    codigo_acesso,
    informacoes_usuario,
}