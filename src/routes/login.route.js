const { Router } = require('express')
const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')


const loginRoutes = new Router()

loginRoutes.post('/', async (req, res) => {
    /*  
            #swagger.tags = ['Login'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Realiza o login no sistema.',
                schema: {
                    $email: "teste@gmail.com",
                    $password: "senha123456",         
            }
        }
    */

    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' })
        }

        const usuario = await Usuario.findOne({
            where: {email:email}
        })

        if (!usuario || usuario.password !== password) {
            return res.status(403).json({ message: 'Email ou senha inválidos' })
        }

        const payload = {sub: usuario.id, email: usuario.email, nome: usuario.nome}

        const token = sign(payload, process.env.SECRET_JWT) 
        
        usuario.loggedIn = true;
        await usuario.save();
        
        return res.status(200).json({
            Token: token,
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        })
       
        
    } catch (error) {
        return res.status(500).json({ error: error, message: 'Algo deu errado!' })
    }
})


module.exports = loginRoutes