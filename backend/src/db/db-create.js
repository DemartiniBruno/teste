const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    storage: 'postgres',
    username: 'postgres',
    password: 'admin'
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
})
Subgrupo.belongsTo(Grupo, { foreignKey: 'id_grupo' });

const ErUsuarioDoSubgrupo = sequelize.define('er_usuario_do_subgrupo',{
    permissao_adm:{
        type: DataTypes.BOOLEAN,
        default: false
    },
})
ErUsuarioDoSubgrupo.belongsTo(Subgrupo, { foreignKey: 'id_subgrupo' });
ErUsuarioDoSubgrupo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = {
    sequelize,
    Usuario,
    Grupo,
    Subgrupo,
    ErUsuarioDoSubgrupo
}