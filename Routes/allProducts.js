const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication, isAdmin} = require('../middlewares/authenticator.middlewares.js')




router.get('/', checkAutentication, ProductController.getAllPaginate)
router.get('/:id', ProductController.getProductById )
router.post('/createProduct', isAdmin, ProductController.create )
router.delete('/deleteProduct/:id', isAdmin, ProductController.deleteProduct )
router.put('/updateProduct/:id', isAdmin, ProductController.updateProduct)


//vista que devuelve el producto seleccionado
router.get('/productView', checkAutentication, ProductController.getProductById);





module.exports = router