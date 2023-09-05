const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js');





router.get('/', checkAutentication, ProductController.getAllPaginate)

router.get('/mockingProducts', checkAutentication, ProductController.generateMockFakerProducts)

//vista que devuelve el producto seleccionado
router.get('/productView', checkAutentication, async (req, res) => {
    const product1 = await ProductController.getProduct();
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



module.exports = router