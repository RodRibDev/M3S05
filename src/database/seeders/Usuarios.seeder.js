const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                id: "100",
                nome: "Josué Santos",
                cpf: "03853265891",
                sexo: "masculino",
                endereco: "Rua Salvador Diniz, 542, Bairro Alvorada",
                data_nascimento: "1999-05-14",
                email: "josue@gmail.com",
                password: "josue1234"
            },
            {
                id: "101",
                nome: "Anaísa Teodoro",
                cpf: "03853265100",
                sexo: "feminino",
                endereco: "Servidão João Decken, 20, Bairro Centro",
                data_nascimento: "1997-01-06",
                email: "anaisa@gmail.com",
                password: "anaisa1234"
            },
            {
                id: "102",
                nome: "Rodrigo Ribeiro",
                cpf: "03853265892",
                sexo: "masculino",
                endereco: "Rua Salvia Diniz, 542, Bairro Alvorada",
                data_nascimento: "1996-05-13",
                email: "rodrigo@gmail.com",
                password: "rodrigo1234"
            },
            {
                id: "103",
                nome: "Leiliane Costa",
                cpf: "03853265101",
                sexo: "feminino",
                endereco: "Servidão Jonas Decken, 21, Bairro Centro",
                data_nascimento: "1990-01-02",
                email: "leiliane@gmail.com",
                password: "leiliane1234"
            },
            {
                id: "104",
                nome: "Bruno Costa",
                cpf: "03853265893",
                sexo: "masculino",
                endereco: "Rua Ceará, 542, Bairro Alvorada",
                data_nascimento: "1996-05-13",
                email: "bruno@gmail.com",
                password: "bruno1234"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Usuario.destroy({
            email: [
                "josue@gmail.com",
                "anaisa@gmail.com",
                "rodrigo@gmail.com",
                "leiliane@gmail.com",
                "bruno@gmail.com"
            ] 
        })
    }
}