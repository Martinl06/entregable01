const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js');
const productManager = new ProductManager('./products.json');
const routesProducts = require('./Routes/products.js');
const routesCart = require('./Routes/cart.js');



app.use(express.json());

app.use('/api/products', routesProducts)
app.use('/api/cart', routesCart)





app.listen(8080, () => console.log('Servidor escuchando en puerto 8080'))