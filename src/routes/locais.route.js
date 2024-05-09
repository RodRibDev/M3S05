const { Router } = require('express')
const Local = require('../models/Local')
const { auth } = require('../middleware/auth')
const { verify } = require('jsonwebtoken')

const localRoutes = new Router()

// async function uId (req, res, next) {
//     const token = req.headers.authorization;

//     if (!token) {
//         console.error(error, error)
//         return res.status(401).json({ message: "Token não é válido" });
//     }

//     try {
//         const decodedToken = verify(token, process.env.SECRET_JWT);
//         req.id = decodedToken.sub;
//         console.log(req.id)
//         next();

//     } catch (error) {
//          console.error("Erro ao verificar o token JWT:", error);
//          return res.status(401).json({ error: "Acesso negado"})
// }
// }

//Criar Novo Local
localRoutes.post("/", auth, async(req, res) => {

    try {
        const nome = req.body.nome 
        const descricao = req.body.descricao
        const localidade = req.body.localidade
        const coordenadas_geograficas = req.body.coordenadas_geograficas
        const usuarios_id = req.body.usuarios_id
    

        const local = await Local.create({
            nome: nome,
            descricao: descricao,
            localidade: localidade,
            coordenadas_geograficas: coordenadas_geograficas,
            usuarios_id : usuarios_id
                       
        })
        res.json(local)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível criar o local!' })
    }
})


// Listar Local com base no Id do usuário logado.
localRoutes.get("/", auth, async (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        console.error(error, error)
        return res.status(401).json({ message: "Token não é válido" });
    }

    try {
        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;
        console.log(req.id)

        const listarPorId = await Local.findAll({
            where: {
                usuarios_id: Token.sub
            }
        })
        res.status(200).json({listarPorId})


    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})

module.exports = localRoutes
