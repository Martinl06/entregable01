const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();


router.use(express.json())

router.get('/', async (req, res) => {
    const products = await productManagerMongo.getProducts()
    res.render('realTimeProducts', products);
  });


  module.exports = router