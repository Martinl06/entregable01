const express = require('express')
const { Router } = express
const router = new Router()
const CartController = require('../controllers/cart.controllers')
const {checkAutentication, UserOk} = require('../middlewares/authenticator.middlewares.js')





router.post('/', checkAutentication,  CartController.createCart)

router.get('/', CartController.getAllCarts )

//router.get('/:cid/products/:pid', UserOk, CartController.getProductByIdCart)

//agrega el carrito con el producto seleccionado
router.post('/:id/products/:id', UserOk, CartController.addProductToCart)

//elimina el producto seleccionado del carrito
router.delete('/:id/products/:id ', UserOk, CartController.deleteProductFromCart)

//actualiza el carrito con un arreglo de productos
router.put('/:id', CartController.UpdateCart)

//actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:id/products/:pid', CartController.UpdateProduct)

//elimina todos los productos del carrito
router.delete('/:id', UserOk, CartController.deleteCart)

//devuelve el carrito con el id pasado por params
router.get('/:id', checkAutentication, CartController.getByIdCart)

// Ruta para finalizar el proceso de compra
router.get('/:id/purchase', CartController.purchase );



module.exports = router;

