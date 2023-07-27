const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')

function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}


router.use(express.json())


router.get('/', checkAutentication, async (req, res) => {
    await productManagerMongo.getProducts()
    .then(products => {
    if(products.length) return res.status(200).render('home', {products})
    return res.status(204).send({data: products, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
})
  

//router.get('*', (req, res) => {
//    res.status(404).render('home',{error404})
//})

module.exports = router