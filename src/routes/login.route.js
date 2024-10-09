const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { sign } = require('jsonwebtoken');

const loginRoutes = new Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operações relacionadas ao login de usuários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Login]
 *     summary: Realiza o login no sistema
 *     description: Autentica o usuário e retorna um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@gmail.com"
 *               password:
 *                 type: string
 *                 example: "senha123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *       400:
 *         description: Email e senha são obrigatórios
 *       403:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
loginRoutes.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.password !== password) {
            return res.status(403).json({ message: 'Email ou senha inválidos' });
        }

        const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome };

        const token = sign(payload, process.env.SECRET_JWT);

        usuario.loggedIn = true;
        await usuario.save();

        return res.status(200).json({
            Token: token,
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: 'Algo deu errado!' });
    }
});

module.exports = loginRoutes;
