const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");
const loginRoutes = require("./login.route");
const localRoutes = require("./locais.route");
const logoutRoutes = require("./logout.route");

const routes = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use("/usuario", usuarioRoutes);
routes.use("/login", loginRoutes);
routes.use("/local", localRoutes);
routes.use("/logout", logoutRoutes);

module.exports = routes;
