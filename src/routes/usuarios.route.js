const { Router } = require('express')
const Usuario = require('../models/Usuario')
const { auth } = require('../middleware/auth')

const usuarioRoutes = new Router()

usuarioRoutes.post("/", async(req, res) => {
    /*  
            #swagger.tags = ['Usuário'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuário',
                schema: {
                    $nome: "Novo Usuário",
                    $cpf: "03834285120",
                    $sexo: "masculino",
                    $endereço: "Rua dos Maracujás, 412, bairro Açaí",
                    $data_nascimento: "1996-12-15",
                    $email: "usuario123@gmail.com",
                    $password: "senha123456",      
            }
        }
    */

    try {
        const nome = req.body.nome 
        let cpf = req.body.cpf
        const sexo = req.body.sexo
        const endereco = req.body.endereco
        const data_nascimento = req.body.data_nascimento
        const email = req.body.email
        const password = req.body.password

        cpf = cpf.replace(/\D/g, '')

        // console.log(cpf)
        const validCpf = (cpf) => {
            if (cpf.length === 11){
                console.log(cpf.length)
                return true
    
            }
            console.log(cpf.length)
        }
        
        if(!validCpf(cpf) ){
            return res.status(400).json({message: "CPF inválido"})
        }


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
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' })
    }
})

module.exports = usuarioRoutes