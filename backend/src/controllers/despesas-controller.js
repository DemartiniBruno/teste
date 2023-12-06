const { STRING } = require('sequelize');
const db = require('../db/db-create');

const cadastraDespesa = async (req, res) => {
    // console.log(req.body)
    try {
        var contador = 0
        if (typeof req.body.valor_total === "string") {

            throw new Error('O valor informado não é um número')

        } else if (req.body.valor_total < 0) {

            throw new Error('O valor total precisa ser maior que 0')

        } else if (req.body.numero_de_parcelas <= 0) {

            throw new Error('O número de parcelas precisa ser maior que 0')

        } else {

            //CONSULTANDO O NUMERO DE APARTAMENTOS 
            req.body.subgrupos_pagantes.forEach(async (element) => {
                if (element.pagante) {
                    contador++
                }
            })

            const despesa = await db.Despesas.create({
                descricao: req.body.descricao,
                numero_de_parcelas: req.body.numero_de_parcelas,
                valor_total: req.body.valor_total,
                valor_rateado: (req.body.valor_total/contador),
                data_vencimento: req.body.data_vencimento,

            })

            req.body.subgrupos_pagantes.forEach(async (element) => {
                if (element.pagante) {
                    await db.ErSubgruposPagantes.create({
                        despesas_id: despesa.id,
                        subgrupo_id: element.subgrupo_id,
                        valor_rateado: despesa.valor_total/contador
                    })
                }
            })

            res.json(despesa)

        }

    } catch (error) {
        res.json(error.message)
    }

}

const consultaDespesas = async (req, res) => {
    try {
        const consultaDespesa = await db.Despesas.findAll({
            attributes: ['id', 'descricao', 'numero_de_parcelas', 'valor_total', 'data_vencimento'],
            include: {
                model: db.ErSubgruposPagantes,
                required: true,
                where: {
                    subgrupo_id: req.params.subgrupo_id
                }
            }
        })
        console.log(consultaDespesa)

        res.json(consultaDespesa);

    } catch (error) {
        res.json(error.message)

    }

}

const consultaDespesas_grupo = async (req, res) => {
    try {
        const despesas_gruopo = await db.Despesas.findAll({
            attributes: ['id', 'descricao', 'numero_de_parcelas', 'valor_total', 'data_vencimento'],
            include: {
                model: db.ErSubgruposPagantes,
                required: false,
                include: {
                    model: db.Subgrupo,
                    required: false,
                    include: {
                        model: db.Grupo,
                        required: false,
                        where: {
                            id: req.params.grupo_id
                        }
                    }
                }
            }
        })

        res.json(despesas_gruopo);

    } catch (error) {
        res.json(error.message)

    }

}

const valor_rateado_subgrupo = async (req, res) => {
    const valor_rateado = await db.sequelize.query(`
        SELECT SUM(VALOR_RATEADO)
    `)
}


const editarDespesa = async (req, res) => {
    try {

        var despesa = await db.Despesas.findOne({
            where: {
                id: req.params.despesa_id
            }
        })
        console.log(`
        
            despesa noirmal

         
        `)
        console.log(despesa.dataValues)
        despesa.descricao = req.body.descricao
        despesa.numero_de_parcelas = req.body.numero_de_parcelas
        despesa.valor_total = req.body.valor_total
        await despesa.save({ fields: ['descricao', 'numero_de_parcelas', 'valor_total'] });
        res.json(despesa)

    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    cadastraDespesa,
    editarDespesa,
    consultaDespesas,
    consultaDespesas_grupo,
    valor_rateado_subgrupo
}