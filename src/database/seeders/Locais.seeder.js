const { QueryInterface, Sequelize } = require("sequelize");
const Local = require("../../models/Local");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Local.bulkCreate([
            {
                nome: "Parque Botânico de Florianópolis",
                descricao: "Grande parque que contém arvores enormes, locais de plantação diversificada e um ótimo espaço para piquiniques",
                cep: "88034000",
                rua: "Rua ABC",
                cidade: "Florianópolis",
                bairro: "Centro",
                uf: "SC",
                latitude: "-27.39652",
                longitude: "-48.39652",
                usuarios_id: "100"
            },
            {
                nome: "Trilha do Gravatá",
                descricao: "Ambiente misto de belas trilhas naturais e paisagens incríveis",
                cep: "88062400",
                rua: "Rua da Praia",
                cidade: "Florianópolis",
                bairro: "Gravatá",
                uf: "SC",
                latitude: "-30.39652",
                longitude: "-60.39652",
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