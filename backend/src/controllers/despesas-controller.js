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

const editarDespesa = async (req, res) => {
    try {

        const despesa = await db.Despesas.findOne({
            where:{
                id: req.params.despesa_id
            }
        })
        despesa = 

        console.log(despesa.dataValues)
        // console.log(despesa)
    //     despesa.descricao = req.body.descricao
    //     console.log(despesa)
    //     despesa.numero_de_parcelas = req.body.numero_de_parcelas
    //     console.log(despesa)
    //     despesa.valor_total = req.body.valor_total
    
    //    console.log(despesa)
    //    await despesa.save(req.body)
    //    console.log(despesa)

        

        // const despesa = req.body;

        // const despesa_que_preciso_fazer_a_alteracao = req.params.despesa_id

        // db.Despesas.update()

        res.json(despesa)

    } catch (error) {
        res.json(error.message)
    }
}




module.exports = {
    cadastraDespesa,
    editarDespesa
}