const express = require('express')
const { Router } = express
const router = new Router()
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const Cart = require('../dao/models/modelCarts')

router.use(express.json())

//vista de producto que devuelve el producto seleccionado
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = productManagerMongo.getProductById(id)
    .then(product => {
    if(product) return res.status(200).send({data: product, message: "Producto encontrado"})
    return res.status(204).send({data: product, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
})


module.exports = router