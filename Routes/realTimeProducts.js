const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');


router.use(express.json())

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts', {products});
  });



  router.post('/', (req, res) => {
    const { title, price, description, code, stock } = req.body;
    const product = productManager.addProduct(title, description, price, code, stock);
    res.redirect('/realTimeProducts');
  })

  module.exports = router