const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')

router.use(express.json())


router.get('/', async (req, res) => {
    await productManagerMongo.getProducts()
    .then(products => {
    if(products.length) return res.status(200).render('home', {products})
    return res.status(204).send({data: products, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
})
  

module.exports = router