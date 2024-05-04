const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Matricula = connection.define("matriculas", {
    nome: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    localidade: {
        type: DataTypes.STRING
    },
    coordenadas_geograficas: {
        type: DataTypes.STRING
    },
    usuarios_id: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
})

module.exports = Matricula