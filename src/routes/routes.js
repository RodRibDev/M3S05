const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");
const loginRoutes = require("./login.route");
const localRoutes = require("./locais.route");

const routes = Router()

routes.use("/usuario", usuarioRoutes)
routes.use("/login", loginRoutes)
routes.use("/local", localRoutes)


module.exports = routes