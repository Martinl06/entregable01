const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../managers/ProductManager.js');
const productManager = new ProductManager('./utils/products.json');


router.use(express.json())

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    res.render('home', { products })
})

module.exports = router