const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');


router.use(express.json())

router.get('/', async (req, res) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts', {products});
  });


  module.exports = router