const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware'); 

/*
    Interno (Knex): Seus produtos favoritos (db('produtos_favoritos')...).
    ○ Externo 1 (Axios): Fake Store API (Listar as categorias de produtos).
    ○ Externo 2 (Axios): ViaCEP (Buscar dados de um CEP fixo, ex: "01001000").
*/
router.get('/', authMiddleware, async (req, res) => {
    //TODO
});