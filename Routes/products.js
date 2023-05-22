const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../managers/ProductManager.js');
const productManager = new ProductManager('./utils/products.json');
const uuid4 = require('uuid4')

router.use(express.json())


router.get('/', (req, res) => {
    res.send({data: productManager.getProducts(), message: "Lista de productos"})
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = productManager.getProductById(id)
    res.send({data: product, message: "Producto encontrado"})
})

router.post('/createProduct', (req, res) => {
   const id = uuid4() 
   const pr = req.body
   pr.id = id
   productManager.addProduct(pr)
    res.send({data: pr, message: "Producto agregado"})
  
})

router.delete('/deleteProduct/:id', async (req,res) =>{
    let id= req.params.id;
    res.send (await productManager.deleteProduct(id))
})


router.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id
    const pr = req.body
    const product = productManager.updateProduct(id, pr)
    res.send({data: product, message: "Producto actualizado"})
})


module.exports = router