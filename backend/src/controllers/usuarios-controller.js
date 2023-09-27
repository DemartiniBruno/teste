const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;

const cadastrarUsuario = async (req, res) => {

    try {
        if (await db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })) {
            throw new Error('Usuário já cadastrado.')
        } else {

            const hash = bcrypt.hash(req.body.senha, saltRounds, function(err, hash) {
                return hash
            })

            const usuario = await db.Usuario.create(req.body)

            bcrypt.hash(usuario.senha, saltRounds, async function(err, hash) {
                await usuario.update({
                    senha: hash
                })
                await usuario.save
            });

            res.json({mensgem:'Usuario cadastrado com sucesso'})
        }
    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message })
    }

};

const login = async (req, res) => {
    const usuario = await db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    })

    try {
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        bcrypt.compare(req.body.senha, usuario.senha, function(err, result) {      
            try {
                if (result){
                    const token = jsonWebToken.sign(
                        {
                            usuario: usuario,
                        }, '123'
                    )
                    res.json(token)
                } else {
                    throw new Error('Senha Inválida')
                }
            } catch (error) {
                console.log(error.message)
                res.json({ error: error.message })
            }            
        });
    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message })
    }
}
module.exports = { cadastrarUsuario, login };