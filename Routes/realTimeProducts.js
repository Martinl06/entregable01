const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication, isAdmin} = require('../middlewares/authenticator.middlewares.js')




router.get('/', checkAutentication, isAdmin, ProductController.getRealTime);


  module.exports = router