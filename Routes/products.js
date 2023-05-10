const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../ProductManager.js');
const productManager = new ProductManager('./products.json');

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
   const pr = req.body
    productManager.addProduct(pr)
    res.send({data: pr, message: "Producto agregado"})
  
})

router.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id
    const product = productManager.deleteProduct(id)
    res.send({data: product, message: "Producto eliminado"})
})

router.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id
    const pr = req.body
    const product = productManager.updateProduct(id, pr)
    res.send({data: product, message: "Producto actualizado"})
})


module.exports = router