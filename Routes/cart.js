const express = require('express')
const { Router } = express
const router = new Router()
const CartController = require('../controllers/cart.controllers')
const {checkAutentication, UserOk} = require('../middlewares/authenticator.middlewares.js')





router.post('/', checkAutentication,  CartController.createCart)

router.get('/', CartController.getAllCarts )

//agrega el carrito con el producto seleccionado
router.post('/:cid/products/:pid', UserOk, CartController.addProductToCart)

//elimina el producto seleccionado del carrito
router.delete('/:cid/products/:pid ', UserOk, CartController.deleteProductFromCart)

//actualiza el carrito con un arreglo de productos
router.put('/cart/:cid', CartController.UpdateCart)

//actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/cart/:cid/products/:pid', CartController.UpdateProduct)

//elimina todos los productos del carrito
router.delete('/cart/:cid', UserOk, CartController.deleteCart)

//devuelve el carrito con el id pasado por params
router.get('/:cid', checkAutentication, CartController.getByIdCart)

// Ruta para finalizar el proceso de compra
router.get('/:cid/purchase', CartController.purchase );



module.exports = router;

