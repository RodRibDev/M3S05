const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { verify } = require('jsonwebtoken');

const logoutRoutes = new Router();

logoutRoutes.post('/', async (req, res) => {
    /*  
            #swagger.tags = ['Logout'],
            #swagger.description = 'Realiza o logout do sistema.'
    */
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const decoded = verify(token, process.env.SECRET_JWT);
        const userId = decoded.sub;

        const usuario = await Usuario.findOne({ where: { id: userId } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.loggedIn = false;
        await usuario.save();

        return res.status(200).json({ message: 'Logout realizado com sucesso!' });

    } catch (error) {
        console.error("Erro ao realizar logout:", error);
        return res.status(500).json({ message: 'Erro ao realizar logout', error: error.message });
    }
});

module.exports = logoutRoutes;
