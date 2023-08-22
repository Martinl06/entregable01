const express = require('express')
const { Router } = express
const router = new Router() 
const ProductControllers = require('../controllers/products.controllers.js')

function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}



router.get('/', checkAutentication, ProductControllers.getAllPaginate )
  

//router.get('*', (req, res) => {
//    res.status(404).render('home',{error404})
//})

module.exports = router