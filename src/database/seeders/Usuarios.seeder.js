const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                id: "1",
                nome: "Josué Santos",
                cpf: "12345678910",
                sexo: "masculino",
                cep: "88101020",
                rua: "Rua Salvador Diniz",
                cidade: "Florianópolis",
                bairro: "Alvorada",
                uf: "SC",
                dataNascimento: "1999-05-14",
                email: "josue@gmail.com",
                password: "josue1234"
            },
            {
                id: "2",
                nome: "Anaísa Teodoro",
                cpf: "12345678911",
                sexo: "feminino",
                cep: "88117410",
                rua: "Servidão João Decken",
                cidade: "Florianópolis",
                bairro: "Centro",
                uf: "SC",
                dataNascimento: "1997-01-06",
                email: "anaisa@gmail.com",
                password: "anaisa1234"
            },
            {
                id: "3",
                nome: "Rodrigo Ribeiro",
                cpf: "12345678912",
                sexo: "masculino",
                cep: "88010000",
                rua: "Rua Salvia Diniz",
                cidade: "Florianópolis",
                bairro: "Ingleses Sul",
                uf: "SC",
                dataNascimento: "1996-05-13",
                email: "rodrigo@gmail.com",
                password: "rodrigo1234"
            },
            {
                id: "4",
                nome: "Leiliane Costa",
                cpf: "12345678913",
                sexo: "feminino",
                cep: "88117410",
                rua: "Rua da Paz",
                cidade: "Florianópolis",
                bairro: "Beira Mar",
                uf: "SC",            
                dataNascimento: "1990-01-02",
                email: "leiliane@gmail.com",
                password: "leiliane1234"
            },
            {
                id: "5",
                nome: "Bruno Costa",
                cpf: "12345678914",
                sexo: "masculino",
                cep: "88117410",
                rua: "Rua Ceará",
                cidade: "Fortaleza",
                bairro: "Fortaleza do LAB",
                uf: "CE",
                dataNascimento: "1996-05-13",
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