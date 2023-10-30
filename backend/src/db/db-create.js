const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    storage: 'postgres',
    username: 'postgres',
    password: 'JovemP*2023'
});

const Usuario = sequelize.define('usuario', {
    nome: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{sequelize, paranoid:true});

const Grupo = sequelize.define('grupo', {
    nome: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{sequelize, paranoid:true});


const Subgrupo = sequelize.define('subgrupo',{
    nome: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    codigo_acesso:{
        type: DataTypes.STRING(5)
    }
})
// Subgrupo.belongsTo(Grupo, { foreignKey: 'grupo_id' });
// Grupo.hasMany(Subgrupo)
// Subgrupo.belongsToMany(Grupo, { through:'grupo_do_usuario', foreignKey: 'grupo_id'})
Grupo.hasMany(Subgrupo, {foreignKey: 'grupo_id'})
Subgrupo.belongsTo(Grupo, {foreignKey: 'grupo_id'})


const ErUsuarioDoSubgrupo = sequelize.define('er_usuario_do_subgrupo',{
    permissao_adm:{
        type: DataTypes.BOOLEAN,
        default: false
    },
})

Subgrupo.hasMany(ErUsuarioDoSubgrupo, {foreignKey: 'subgrupo_id'})
ErUsuarioDoSubgrupo.belongsTo(Subgrupo, { foreignKey: 'subgrupo_id' });
Usuario.hasMany(ErUsuarioDoSubgrupo, {foreignKey: 'usuario_id'})
ErUsuarioDoSubgrupo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

//implementação

const Despesas = sequelize.define('despesa', {
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numero_de_parcelas: {
        type: DataTypes.INTEGER,
        default: 1
    },
    valor_total:{
        type: DataTypes.NUMERIC,
        allowNull: true
    },
    data_quitacao:{
        type: DataTypes.DATE
    },
    status_ativo:{
        type: DataTypes.BOOLEAN,

        //orçamento não implementado na V1
    }
    
},{sequelize, paranoid:true})

//Criar a FK de orçamento depois que criar a tabela ORÇAMENTO

const ErSubgruposPagantes = sequelize.define('er_subgrupos_pagantes', {},{sequelize, paranoid:true})
ErSubgruposPagantes.belongsTo(Subgrupo, {foreignKey: 'subgrupo_id'})
ErSubgruposPagantes.belongsTo(Despesas, {foreignKey: 'despesas_id'})

//implementação

module.exports = {
    sequelize,
    Usuario,
    Grupo,
    Subgrupo,
    ErUsuarioDoSubgrupo,
    Despesas,
    ErSubgruposPagantes
}