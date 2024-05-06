const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");
const loginRoutes = require("./login.route");

const routes = Router()

routes.use("/usuario", usuarioRoutes)
routes.use("/login", loginRoutes)


module.exports = routes