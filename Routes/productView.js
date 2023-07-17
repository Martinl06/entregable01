const express = require('express')
const { Router } = express
const router = new Router()
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const Cart = require('../dao/models/modelCarts')


function checkAutentication (req, res, next) { 
  if(req.session.user) {
      next()
  } else {
      res.redirect('/api/sessions/login')
  }
}

router.use(express.json())

//vista que devuelve el producto seleccionado
router.get('/', checkAutentication, async (req, res) => {
    const product1 = await productManagerMongo.getProduct(req.body.product)
    const productGet = {
        name: product1.name,
        description: product1.description,
        price: product1.price,
        stock: product1.stock,
        thumbnail: product1.thumbnail,
        genero: product1.genero,
        code: product1.code,
        
    }
    console.log(productGet)
    return res.status(200).render('productView', {productGet})

  })





    /*const id = req.params.id
    const product = productManagerMongo.getProductById(id)
    .then(product => {
    if(product) return res.status(200).send({data: product, message: "Producto encontrado"})
    return res.status(204).send({data: product, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))*/



module.exports = router