const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const axios = require('axios');
const authMiddleware = require('../authMiddleware');

/*
    O usuário envia apenas { "produto_api_id": 5}. Seu backend deve:
    1. Chamar a Fake Store API com Axios para buscar os dados desse produto (ex: title, price).
    2. Salvar os dados enriquecidos no banco, associados ao req.usuario.id.
*/

// authMiddleware
router.post('/', authMiddleware, async (req, res) => {
    const sent_fav = req.body.produto_api_id;  
    let fav_res;
    await axios.get(`https://fakestoreapi.com/products/${sent_fav}`).then( response => {fav_res = response.data});

    const produto_existe = await db('produtos_favoritos').where({
        usuario_id: req.usuario.id,
        produto_api_id: fav_res.id
    })
    .first();
    console.log(produto_existe);
    if(produto_existe){
        res.status(403).json({"response":"Produto já foi cadastrado como favorito para esse usuário"})
        return;
    }
    await db('produtos_favoritos')
        .insert({
                nome_produto:fav_res.title, 
                preco_produto:fav_res.price, 
                produto_api_id:fav_res.id, 
                usuario_id:req.usuario.id 
        })
        .returning(['nome_produto', 'preco_produto']);

    res.status(200).json({"Produto inserido:" :fav_res.title, "Usuário":req.usuario.id})
    
});

// Lista os produtos favoritos salvos no banco pelo usuário logado.
router.get('/', authMiddleware, async (req, res) => {
    const todos_produtos = await db('produtos_favoritos').select('*');
    res.status(201).json(todos_produtos)
});

//Deleta o favorito. Lógica: Deve checar se o favorito pertence ao usuário.
router.delete('/:id', authMiddleware, async (req, res) => {
    const item = await db('produtos_favoritos').select('*').where({produto_api_id:req.params.id}).first();
    if(!item || !item.usuario_id){
        res.status(404).json({"response":"Produto não encontrado"})
        return;
    }
    if(!item.usuario_id == req.usuario.id){
        console.log("shall not pass")
        console.log(item.usuario_id);
        console.log(req.usuario.id);
        res.status(401).json({"response":"Item não pertence ao usuário"})
        return;
    }
    const deleted_item = await db('produtos_favoritos').delete().where({produto_api_id:req.params.id})
    res.status(200).json({"Item deletado":deleted_item})
});

module.exports = router;