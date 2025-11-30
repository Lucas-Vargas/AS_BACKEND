const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');

/*
    O usuário envia apenas { "produto_api_id": 5}. Seu backend deve:
    1. Chamar a Fake Store API com Axios para buscar os dados desse produto (ex: title, price).
    2. Salvar os dados enriquecidos no banco, associados ao req.usuario.id.
*/
router.post('/', authMiddleware, async (req, res) => {
    //TODO
});

// Lista os produtos favoritos salvos no banco pelo usuário logado.
router.get('/', authMiddleware, async (req, res) => {
    //TODO
});

//Deleta o favorito. Lógica: Deve checar se o favorito pertence
router.delete('/:id', authMiddleware, async (req, res) => {
    //TODO
});

module.exports = router;