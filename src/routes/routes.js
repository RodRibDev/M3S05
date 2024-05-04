const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");

const routes = Router()

routes.use("/usuario", usuarioRoutes)



module.exports = routes