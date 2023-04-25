const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js');
const productManager = new ProductManager('./products.json');


app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'))

app.get('/products', async (req, res) => {
    try{
        const limit = parseInt(req.query.limit)
        const products = await productManager.getProducts()
        if(!limit){
            res.send(products)
        }else{
            res.send(products.slice(0, limit))
        }
    }catch(err){
        res.send('Error')
    }
})


app.get('/products/:pid', async (req, res) => {
    try{
        const id = parseInt(req.params.pid)
        const productFound = await productManager.getProductById(id)
        if(!productFound){
        res.send('No existe el producto')
    }else{
        res.send(productFound)
    }
    }catch(err){
        res.send('Error')
    }
})
