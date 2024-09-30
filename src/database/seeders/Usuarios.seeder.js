const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                id: "100",
                nome: "João Vitor",
                cpf: "03853265891",
                sexo: "masculino",
                endereco: "Rua Salvador Diniz, 542, Bairro Alvorada",
                data_nascimento: "1999-05-14",
                email: "joaovitor@gmail.com",
                password: "joao9564"
            },
            {
                id: "101",
                nome: "Ana Maria",
                cpf: "03853265100",
                sexo: "feminino",
                endereco: "Servidão João Decken, 20, Bairro Centro",
                data_nascimento: "1987-01-06",
                email: "anamaria@gmail.com",
                password: "anamaria51"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Usuario.destroy({
            email: [
                "joaovitor@gmail.com", 
                "anamaria@gmail.com"
            ] 
        })
    }
}