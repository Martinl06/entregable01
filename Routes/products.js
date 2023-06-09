const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')
const uuid4 = require('uuid4')



router.use(express.json())



router.get('/', async (req, res) => {
    await productManagerMongo.getProducts()
    .then(products => {
    if(products.length) return res.status(200).send({data: products, message: "Productos encontrados"})
    return res.status(204).send({data: products, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = productManagerMongo.getProductById(id)
    .then(product => {
    if(product) return res.status(200).send({data: product, message: "Producto encontrado"})
    return res.status(204).send({data: product, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
})

router.post('/createProduct', (req, res) => {
   const Newproduct = req.body
    const product = new Product(Newproduct)
    productManagerMongo.addProduct(product)
   .then(product =>{
         res.status(201).send({
            msg: "Producto creado",
            data: product
         })
        })
        .catch(err => res.status(500).send({err}))
 })

router.delete('/deleteProduct/:id', async (req,res) =>{
    const id = req.params.id
    const product = await productManagerMongo.deleteProduct(id)
    if(product) return res.status(200).send({data: product, message: "Producto eliminado"})
    return res.status(204).send({data: product, message: "No hay productos"})
})


router.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id
    const pr = req.body
    const product = productManagerMongo.updateProduct(id, pr)
    res.send({data: product, message: "Producto actualizado"})
})


module.exports = router