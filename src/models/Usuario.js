const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Usuario = connection.define('usuarios', {
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    nome: {
        type: DataTypes.STRING,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len:[11,11]
        }
    },
    sexo: {
        type: DataTypes.STRING,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    data_nascimento: {
        type: DataTypes.DATE
    }
    
})


module.exports = Usuario