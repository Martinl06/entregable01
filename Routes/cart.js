const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require('../dao/managers/CartManager');
const cartManager = new CartManager('./utils/carrito.json');
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const uuid4 = require('uuid4')

router.use(express.json())


router.post('/', (req, res) => {
  res.send({data: cartManagerMongo.addCart(), message: "Agregado"})
})

router.get('/', (req, res) => {
    const carts = cartManagerMongo.getCarts()
    res.send({data: carts, message: "Carritos encontrados"})
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    const cart = cartManagerMongo.getCartID(id)
    res.send({data: cart, message: "Carrito encontrado"})
})


module.exports = router;