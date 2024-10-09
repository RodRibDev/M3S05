const { Router } = require('express'); 
const Local = require('../models/Local');
const { auth } = require('../middleware/auth');
const { verify } = require('jsonwebtoken');
const axios = require('axios');

const localRoutes = new Router();

/**
 * @swagger
 * tags:
 *   name: Local
 *   description: Operações relacionadas a locais
 */

/**
 * @swagger
 * /local:
 *   post:
 *     tags: [Local]
 *     summary: Adiciona um novo local
 *     description: Cria um novo local associado ao usuário autenticado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               cep:
 *                 type: string
 *               rua:
 *                 type: string
 *               cidade:
 *                 type: string
 *               bairro:
 *                 type: string
 *               uf:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               usuarios_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Local'
 *       404:
 *         description: CEP não encontrado
 *       500:
 *         description: Erro ao criar local
 */
localRoutes.post("/", auth, async (req, res) => {
    try {
        const { nome, descricao, rua, cidade, bairro, uf, latitude, longitude, cep, usuarios_id } = req.body;

        const response = await axios.get(`https://nominatim.openstreetmap.org/search.php?postalcode=${cep}&country=Brazil&limit=1&format=jsonv2`);

        if (response.data && response.data.length > 0) {
            const local = await Local.create({ nome, descricao, rua, cidade, bairro, uf, latitude, longitude, cep, usuarios_id });
            return res.status(201).json(local);
        } else {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Não foi possível criar o local!' });
    }
});

/**
 * @swagger
 * /local:
 *   get:
 *     tags: [Local]
 *     summary: Lista locais do usuário autenticado
 *     description: Retorna todos os locais associados ao usuário autenticado.
 *     responses:
 *       200:
 *         description: Lista de locais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Local'
 *       401:
 *         description: Token não é válido
 *       500:
 *         description: Erro ao listar locais
 */
localRoutes.get("/", auth, async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        const locais = await Local.findAll({ where: { usuarios_id: Token.sub } });
        return res.status(200).json(locais);
    } catch (error) {
        console.error("Erro ao validar o token JWT:", error);
        return res.status(401).json({ error: "Acesso negado" });
    }
});

/**
 * @swagger
 * /local/all:
 *   get:
 *     tags: [Local]
 *     summary: Lista todos os locais cadastrados
 *     responses:
 *       200:
 *         description: Lista de todos os locais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Local'
 *       500:
 *         description: Erro ao listar os locais
 */
localRoutes.get("/all", async (req, res) => {
    try {
        const locais = await Local.findAll();
        return res.status(200).json(locais);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar os locais" });
    }
});

/**
 * @swagger
 * /local/{id}:
 *   get:
 *     tags: [Local]
 *     summary: Detalhes de um local específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do local a ser recuperado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Informações do local
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Local'
 *       404:
 *         description: Local não encontrado
 *       401:
 *         description: Acesso negado
 */
localRoutes.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        const local = await Local.findOne({ where: { id, usuarios_id: Token.sub } });

        if (local) {
            return res.status(200).json(local);
        } else {
            return res.status(404).json({ message: "Local não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao validar o token JWT:", error);
        return res.status(401).json({ error: "Acesso negado" });
    }
});

/**
 * @swagger
 * /local/{local_id}:
 *   put:
 *     tags: [Local]
 *     summary: Atualiza um local cadastrado
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         description: ID do local a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               rua:
 *                 type: string
 *               cidade:
 *                 type: string
 *               bairro:
 *                 type: string
 *               uf:
 *                 type: string
 *               cep:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *     responses:
 *       200:
 *         description: Local atualizado com sucesso
 *       404:
 *         description: Local não encontrado
 *       401:
 *         description: Acesso negado
 */
localRoutes.put("/:local_id", auth, async (req, res) => {
    try {
        const { local_id } = req.params;
        const { nome, descricao, rua, cidade, bairro, uf, cep, latitude, longitude } = req.body;
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        const local = await Local.findOne({ where: { id: local_id, usuarios_id: Token.sub } });

        if (local) {
            await local.update({ nome, descricao, rua, cidade, bairro, uf, cep, latitude, longitude });
            return res.status(200).json({ message: "Local atualizado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Local não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao validar o token JWT:", error);
        return res.status(401).json({ error: "Acesso negado" });
    }
});

/**
 * @swagger
 * /local/{local_id}:
 *   delete:
 *     tags: [Local]
 *     summary: Deleta um local
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         description: ID do local a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Local deletado com sucesso
 *       404:
 *         description: Local não encontrado
 *       401:
 *         description: Acesso negado
 */
localRoutes.delete("/:local_id", auth, async (req, res) => {
    try {
        const { local_id } = req.params;
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        const local = await Local.findOne({ where: { id: local_id, usuarios_id: Token.sub } });

        if (local) {
            await local.destroy();
            return res.status(204).json({});
        } else {
            return res.status(404).json({ message: "Local não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao validar o token JWT:", error);
        return res.status(401).json({ error: "Acesso negado" });
    }
});

/**
 * @swagger
 * /local/{local_id}/maps:
 *   get:
 *     tags: [Link Maps]
 *     summary: Gera um link para o Google Maps
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         description: ID do local para gerar o link
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Link para o Google Maps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 googleMapsLink:
 *                   type: string
 *       404:
 *         description: CEP não encontrado
 *       401:
 *         description: Acesso negado
 */
localRoutes.get("/:local_id/maps", auth, async (req, res) => {
    try {
        const { local_id } = req.params;
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        const local = await Local.findOne({ where: { id: local_id, usuarios_id: Token.sub } });

        if (!local) {
            return res.status(404).json({ error: 'Local não encontrado' });
        }

        const cepData = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${local.cep}&country=Brazil&limit=1`);

        if (cepData.data && cepData.data.length > 0) {
            const { lat, lon } = cepData.data[0];
            const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
            return res.json({ googleMapsLink });
        } else {
            return res.status(404).send({ error: 'CEP não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        return res.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
});

module.exports = localRoutes;
