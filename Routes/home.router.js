const express = require('express')
const { Router } = express
const router = new Router() 
const ProductController = require('../controllers/products.controllers.js')
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js')




router.get('/', checkAutentication, ProductController.getImageHome )
  

module.exports = router