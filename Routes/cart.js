const express = require('express')
const { Router } = express
const router = new Router()
const CartController = require('../controllers/cart.controllers')


function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}




router.post('/', checkAutentication,  CartController.createCart)

router.get('/', CartController.getAllCarts )

//agrega el carrito con el producto seleccionado
router.post('/:cid/products/:pid', CartController.addProductToCart)

//elimina el producto seleccionado del carrito
router.delete('/:cid/products/:pid ', CartController.deleteProductFromCart)

//actualiza el carrito con un arreglo de productos
router.put('/cart/:cid', CartController.UpdateCart)

//actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/cart/:cid/products/:pid', CartController.UpdateProduct)

//elimina todos los productos del carrito
router.delete('/cart/:cid', CartController.deleteCart)

module.exports = router;