const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { auth } = require('../middleware/auth');

const usuarioRoutes = new Router();

/**
 * @swagger
 * tags:
 *   name: Usuário
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuário]
 *     summary: Adiciona um novo usuário
 *     description: Cria um novo usuário com as informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Usuário"
 *               cpf:
 *                 type: string
 *                 example: "03834285120"
 *               sexo:
 *                 type: string
 *                 example: "masculino"
 *               cep:
 *                 type: string
 *                 example: "88117410"
 *               rua:
 *                 type: string
 *                 example: "Rua dos Maracujás"
 *               bairro:
 *                 type: string
 *                 example: "Açaí"
 *               cidade:
 *                 type: string
 *                 example: "Florianópolis"
 *               uf:
 *                 type: string
 *                 example: "SC"
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 example: "1996-12-15"
 *               email:
 *                 type: string
 *                 example: "usuario123@gmail.com"
 *               password:
 *                 type: string
 *                 example: "senha123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 sexo:
 *                   type: string
 *                 cep:
 *                   type: string
 *                 rua:
 *                   type: string
 *                 bairro:
 *                   type: string
 *                 cidade:
 *                   type: string
 *                 uf:
 *                   type: string
 *                 dataNascimento:
 *                   type: string
 *                   format: date
 *                 email:
 *                   type: string
 *       400:
 *         description: CPF inválido
 *       409:
 *         description: CPF ou Email já cadastrados
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRoutes.post("/", async(req, res) => {
    try {
        const { nome, cpf, sexo, cep, rua, bairro, cidade, uf, dataNascimento, email, password } = req.body;

        const sanitizedCpf = cpf.replace(/\D/g, '');
        
        const validCpf = (cpf) => cpf.length === 11;

        if (!validCpf(sanitizedCpf)) {
            return res.status(400).json({ message: "CPF inválido" });
        }

        const existingCpf = await Usuario.findOne({ where: { cpf: sanitizedCpf } });
        const existingEmail = await Usuario.findOne({ where: { email } });

        if (existingCpf) {
            return res.status(409).json({ message: "CPF já cadastrado!" });
        }

        if (existingEmail) {
            return res.status(409).json({ message: "Email já cadastrado!" });
        }

        const usuario = await Usuario.create({
            nome, cpf: sanitizedCpf, sexo, cep, rua, bairro, cidade, uf, dataNascimento, email, password
        });

        res.status(201).json(usuario);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
    }
});

/**
 * @swagger
 * /usuarios/ativos:
 *   get:
 *     tags: [Usuário]
 *     summary: Conta o número de usuários ativos
 *     description: Retorna o total de usuários que estão logados.
 *     responses:
 *       200:
 *         description: Número total de usuários ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRoutes.get("/ativos", async(req, res) => {
    try {
        const totalUsuarios = await Usuario.count({ where: { loggedIn: true } });
        res.status(200).json(totalUsuarios);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Erro no servidor, não foi possível localizar os usuários ativos' });
    }
});

module.exports = usuarioRoutes;
