const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require('../dao/managers/CartManager');
const cartManager = new CartManager('./utils/carrito.json');
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const Cart = require('../dao/models/modelCarts')

router.use(express.json())

router.get('/:cid', (req, res) => {
    res.send('vista de carrito con sus productos')
})


module.exports = router