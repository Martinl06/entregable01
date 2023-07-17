const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')
const uuid4 = require('uuid4');
const { paginate } = require('mongoose-paginate-v2');


function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}


router.use(express.json())



router.get('/', checkAutentication, async (req, res) => {
    const {page, limit} = req.query
    try{
       const products = await productManagerMongo.getAll(page, limit)
       //console.log(products)
       return res.status(200).json({
           status: 'success',
           payload: products.docs,
           totalPages: products.totalPages,
           prevPage: products.prevPage,
           nextPage: products.nextPage,
           page: products.page,
           hasPrevPage: products.hasPrevPage,
           hasNextPage: products.hasNextPage,
           prevLink: products.hasPrevPage? `http://localhost:8080/products/?page=${products.prevPage}`: null,
           nextLink: products.hasNextPage? `http://localhost:8080/products/?page=${products.nextPage}`: null,   
       })
   }catch(err){
       console.log(err)
       return res.status(500).json({
           status: 'error',
           message: 'Error al obtener los productos',
           data:{}
       })
     }
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