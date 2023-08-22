const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')

function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}



router.get('/', checkAutentication, ProductController.getAllPaginate)


module.exports = router