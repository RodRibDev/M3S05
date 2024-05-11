const { Router } = require('express')
const Local = require('../models/Local')
const { auth } = require('../middleware/auth')
const { verify } = require('jsonwebtoken')

const localRoutes = new Router()

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


// Listar informações detalhadas de um local específico
localRoutes.get("/:id", auth, async(req, res) => {

    try {
        const { id } = req.params

        const token = req.headers.authorization;

        if (!token) {
            console.error(error, error)
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const listarLocal = await Local.findOne({
            where: {
                id: id,
                usuarios_id: Token.sub
            }
        })

        if (listarLocal){
            res.status(200).json({listarLocal})  
        } else {
            res.status(400).json({message: "não existe local cadastrado neste ID"})
        }
    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


// Atualizar local
localRoutes.put("/:local_id", async(req, res) => {

    try {
        let { local_id } = req.params

        const nome = req.body.nome
        const descricao = req.body.descricao
        const localidade = req.body.localidade
        const coordenadas_geograficas = req.body.coordenadas_geograficas
        const usuarios_id = req.body.usuarios_id

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const editLocal = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: Token.sub
            }
        })

        if (editLocal){
            editLocal.update({
                nome : nome, 
                descricao : descricao, 
                localidade : localidade,
                coordenadas_geograficas : coordenadas_geograficas,
                usuarios_id : usuarios_id
            })
                
            await editLocal.save()

            res.status(200).json({message:"Local atualizado com sucesso!"})  
        } else {
            res.status(400).json({message: "não existe local cadastrado neste ID"})
        }
    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


// Deletar local
localRoutes.delete("/:local_id", auth, async(req, res) => {
    try {
        const { local_id } = req.params

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const local = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: Token.sub
            }
        })

        if (local){
            local.destroy()
            res.status(204).json({})  
        } else {
            res.status(400).json({message: "Local não encontrado"})
        }

    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})

module.exports = localRoutes
