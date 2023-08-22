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
  const product1 = await productManagerMongo.getProduct();
  console.log(product1);
  if (!product1) {
    return res.status(404).send('Producto no encontrado');
  }

  const productGet = {
    name: product1.name,
    description: product1.description,
    price: product1.price,
    image: product1.image,
    stock: product1.stock,
    code: product1.code,
    genero: product1.genero
  };

  console.log(productGet);
  return res.status(200).render('productView', { productGet });
});





    /*const id = req.params.id
    const product = productManagerMongo.getProductById(id)
    .then(product => {
    if(product) return res.status(200).send({data: product, message: "Producto encontrado"})
    return res.status(204).send({data: product, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))*/



module.exports = router