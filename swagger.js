const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "API Natureza 365",
    description: "API Rest para integração de dados no projeto final do módulo 3 do #FloripaMaisTec - Turma Nature - Squad 3",
    version: "1.0.0"
  },
  host: 'localhost:3000',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token de Autenticação'
    }
  }
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);