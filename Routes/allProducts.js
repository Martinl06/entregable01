const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js');




router.get('/', checkAutentication, ProductController.getAllPaginate)

router.get('/mockingProducts', checkAutentication, ProductController.generateMockFakerProducts)

//vista que devuelve el producto seleccionado
router.get('/productView', checkAutentication, ProductController.getProductById);



module.exports = router