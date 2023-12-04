const { STRING } = require('sequelize');
const db = require('../db/db-create');

const cadastraDespesa = async (req, res) => {
    console.log(req.body)
    try {

        if (typeof req.body.valor_total === "string") {

            throw new Error('O valor informado não é um número')

        } else if (req.body.valor_total < 0) {

            throw new Error('O valor total precisa ser maior que 0')

        } else if (req.body.numero_de_parcelas <= 0) {

            throw new Error('O número de parcelas precisa ser maior que 0')

        } else {

            const despesa = await db.Despesas.create(req.body)

            req.body.subgrupos_pagantes.forEach(async subgrupo_pagante => {
                if (subgrupo_pagante.pagante) {
                    await db.ErSubgruposPagantes.create({
                        despesas_id: despesa.id,
                        subgrupo_id: subgrupo_pagante.id
                        
                    })
                }
            })

            // res.json(despesa)

            // const despesa = await db.Despesas.create(req.body)
            res.json(despesa)

        }

    } catch (error) {
        res.json(error.message)
    }

}

const consultaDespesas = async (req, res) => {
    try {
        const consultaDespesa = await db.Despesas.findAll({
            attributes: ['id','descricao', 'numero_de_parcelas', 'valor_total', 'data_vencimento'],
            include: {
                model: db.ErSubgruposPagantes,
                required: false,
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
            attributes: ['id','descricao', 'numero_de_parcelas', 'valor_total', 'data_vencimento'],
            include: {
                model: db.ErSubgruposPagantes,
                required: false,
                include: {
                    model: db.Subgrupo,
                    required: false,
                    include: {
                        model: db.Grupo,
                        required: false,
                        where:{
                            id:req.params.grupo_id
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
    consultaDespesas_grupo
}