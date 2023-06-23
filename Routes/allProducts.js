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



router.use(express.json())

router.get('/', async (req, res) => {
    const {page, limit} = req.query
    const products = await productManagerMongo.getAll(page, limit)
    //console.log(products)
    let productsArray = products.docs.map((product)=>{
        return {
            name: product.name,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
            genero: product.genero
        }
    })
    const {docs , ...rest} = products
    let links = []

    for (let i = 1; i <= rest.totalPages + 1; i++) {
        links.push({label:i, href:'http://localhost:8080/products/?page=' + i})
    }
    return res.status(200).render('productsAll',{productsArray, pagination: rest, links})
})


module.exports = router