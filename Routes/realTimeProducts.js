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

//middleware para verificar si el usuario es admin
function isAdmin(req, res, next) {
  if (req.session?.user?.email === 'adminCoder@coder.com') {
    return next();
  }else{
    return res.status(401).send({message: 'No tiene permisos para acceder a esta ruta'});
  }
}


router.get('/', checkAutentication, isAdmin, ProductController.getRealTime);


  module.exports = router