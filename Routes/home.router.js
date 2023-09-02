const express = require('express')
const { Router } = express
const router = new Router() 
const ProductControllers = require('../controllers/products.controllers.js')
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js')




router.get('/', checkAutentication, ProductControllers.getImageHome )
  

//router.get('*', (req, res) => {
//    res.status(404).render('home',{error404})
//})

module.exports = router