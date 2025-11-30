const express = require('express');
const router = express.Router();
const axios = require('axios');
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
    const prod_fav = await db('produtos_favoritos').select('*').where({ usuario_id: req.usuario.id });

    let categorias = [];
    let promises = [];
    let count = 0
    for (const prods of prod_fav) {
        let temp_prod;
        promises[count] = await axios.get(`https://fakestoreapi.com/products/${prods.produto_api_id}`);
        count++;
    }
    const values = await Promise.all(promises);
    categorias = values.map(v => v.data.category);
    console.log(categorias)

    cep = await axios.get(`https://viacep.com.br/ws/01001000/json`)

    res.status(200).json({ "Produtos": prod_fav, "Categorias": categorias, "CEP": cep.data });

});

module.exports = router;