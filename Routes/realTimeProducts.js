const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();


function checkAutentication (req, res, next) { 
  if(req.session.user) {
      next()
  } else {
      res.redirect('/api/sessions/login')
  }
}

//middleware para verificar si el usuario es admin
function isAdmin(req, res, next) {
  if (req.session?.user?.email === 'adminCoder@coder.com') {
    return next();
  }else{
    return res.status(401).send({message: 'No tiene permisos para acceder a esta ruta'});
  }
}

router.use(express.json())

router.get('/', checkAutentication, isAdmin, async (req, res) => {
    const products = await productManagerMongo.getProducts()
    res.render('realTimeProducts', products);
  });


  module.exports = router