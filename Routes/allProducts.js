const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js')




router.get('/', checkAutentication, ProductController.getAllPaginate)


module.exports = router