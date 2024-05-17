const { QueryInterface, Sequelize } = require("sequelize");
const Local = require("../../models/Local");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Local.bulkCreate([
            {
                nome: "Parque Botânico de Florianópolis",
                descricao: "Grande parque que contém arvores enormes, locais de plantação diversificada e um ótimo espaço para piquiniques",
                localidade: "Localizado no bairro Itacorubi",
                cep: "88034000",
                usuarios_id: "100"
            },
            {
                nome: "Trilha do Gravatá",
                descricao: "Ambiente misto de belas trilhas naturais e paisagens incríveis",
                localidade: "Localizado em Lagoa da Conceição",
                cep: "88062400",
                usuarios_id: "101"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Local.destroy({
            usuarios_id: [
                "100", 
                "101"
            ] 
        })
    }
}