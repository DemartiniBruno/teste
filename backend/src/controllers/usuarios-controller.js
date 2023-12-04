const db = require('../db/db-create');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const global_controller = require('./global-controller')



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

            const hash = bcrypt.hash(req.body.senha, saltRounds, function (err, hash) {
                return hash
            })

            const usuario = await db.Usuario.create(req.body)

            bcrypt.hash(usuario.senha, saltRounds, async function (err, hash) {
                await usuario.update({
                    senha: hash
                })
                await usuario.save
            });

            res.json({ status: 200, mensagem: 'Usuario cadastrado com sucesso' })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, mensagem: error.message })
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

        bcrypt.compare(req.body.senha, usuario.senha, function (err, result) {
            try {
                if (result) {
                    const token = jsonWebToken.sign(
                        {
                            usuario: usuario,
                        }, '123'
                    )
                    res.json({ status: 200, mensagem: 'ok', token: token })
                } else {
                    throw new Error('Senha Inválida')
                }
            } catch (error) {
                console.log(error.message)
                res.json({ status: 500, mensagem: error.message })
            }
        });
    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, mensagem: error.message })
    }
}

const relacao = async (req, res) => {
    const usuario = global_controller.informacoes_usuario(req.headers.authorization)
    const relacionamento = await db.ErUsuarioDoSubgrupo.findOne({
        where: {
            usuario_id: usuario.usuario.id
        }
    })
    res.json(relacionamento)
}


module.exports = {
    cadastrarUsuario,
    login,
    relacao
};