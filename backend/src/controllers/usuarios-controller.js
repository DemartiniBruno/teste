const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {

    try {
        if (await db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })) {
            throw new Error('Usuário já cadastrado.')
        } else {
            const usuario = await db.Usuario.create(req.body)
            res.json(usuario)
        }
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }
    
};

const login = async (req, res) => {
    const usuario = await db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    })

    try {
        if(!usuario){
            throw new Error('Usuário não encontrado')
        } 
        if(usuario.senha === req.body.senha){
            const token = jsonWebToken.sign(
                {
                    usuario: usuario,
                }, '123'
            )
            console.log(token)
            res.json(token)
        }
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }
}
module.exports = { cadastrarUsuario, login };