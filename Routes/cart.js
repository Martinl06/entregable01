const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require('../managers/CartManager.js');
const cartManager = new CartManager('./utils/carrito.json');
const uuid4 = require('uuid4')

router.use(express.json())


router.post('/', (req, res) => {
  res.send({data: cartManager.addCart(), message: "Agregado"})
})

router.get('/', (req, res) => {
    const carts = cartManager.getCarts()
    res.send({data: carts, message: "Lista de carritos"})
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    const cart = cartManager.getCartID(id)
    res.send({data: cart, message: "Carrito encontrado"})
})


module.exports = router;