const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication, isAdmin} = require('../middlewares/authenticator.middlewares.js')





router.get('/', checkAutentication, ProductController.getAllPaginate)
router.get('/:id', ProductController.getById )
router.post('/createProduct', isAdmin, ProductController.create )
router.delete('/deleteProduct/:id', isAdmin, ProductController.deleteProduct )
router.put('/updateProduct/:id', isAdmin, ProductController.updateProduct)



module.exports = router