const { STRING } = require('sequelize');
const db = require('../db/db-create');

const cadastraDespesa = async (req, res) => {

    try {
        
        if (typeof req.body.valor_total==="string") {

            throw new Error('O valor informado não é um número')

        } else if (req.body.valor_total < 0) {

            throw new Error('O valor total precisa ser maior que 0')

        } else if (req.body.numero_de_parcelas <= 0) {

            throw new Error('O número de parcelas precisa ser maior que 0')

        } else {
            const despesa = await db.Despesas.create(req.body)
            res.json(despesa)
        }


    } catch (error) {
        res.json(error.message)
    }

}

module.exports = {
    cadastraDespesa
}