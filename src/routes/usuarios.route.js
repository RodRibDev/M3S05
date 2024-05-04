const { Router } = require('express')
const Usuario = require('../models/Usuario')

const usuarioRoutes = new Router()

usuarioRoutes.post("/", async(req, res) => {
    try {
        const nome = req.body.nome 
        const cpf = req.body.cpf
        const sexo = req.body.sexo
        const endereco = req.body.endereco
        const data_nascimento = req.body.data_nascimento
        const email = req.body.email
        const password = req.body.password

        
        const VerifyCpf = await Usuario.findOne({
            where: {
                cpf: cpf,
            }
        })
        const VerifyEmail = await Usuario.findOne({
            where: {
                email: email,
            }
        })

        if (VerifyCpf){
            return res.status(409).json({ message: "CPF já cadastrado!"})
        }

        if (VerifyEmail){
            return res.status(409).json({ message: "Email já cadastrado!"})
        }


        const usuario = await Usuario.create({
            nome: nome,
            cpf: cpf,
            sexo: sexo,
            endereco: endereco,
            data_nascimento: data_nascimento,
            email: email,
            password: password
        })
        res.json(usuario)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o usuário' })
    }
})

module.exports = usuarioRoutes