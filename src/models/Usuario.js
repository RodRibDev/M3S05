const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Usuario = connection.define('usuarios', {
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
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
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
    
})


module.exports = Usuario