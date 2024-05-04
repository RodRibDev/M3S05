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
        type: DataTypes.STRING,
        unique: true
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