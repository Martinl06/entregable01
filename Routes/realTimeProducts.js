const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../ProductManager.js');
const productManager = new ProductManager('./products.json');


router.use(express.json())

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts', {products});
  });

  module.exports = router