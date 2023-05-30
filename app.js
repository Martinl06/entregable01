//create server
const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;

//import products
const ProductManager = require('./managers/ProductManager.js');
const productManager = new ProductManager('./utils/products.json');
const CartManager = require('./managers/CartManager.js');
const cartManager = new CartManager('./utils/Carrito.json');

//import routes
const routesProducts = require('./Routes/products.js');
const routesCart = require('./Routes/cart.js');
const homeRouter = require('./Routes/home.router.js')
const realTimeProducts = require('./Routes/realTimeProducts.js')

//import http
const http = require('http')
const server = http.createServer(app)

//import socket
const { Server } = require('socket.io')
const io = new Server(server)







app.use(express.json());

//Views engine
const handlebars = require('express-handlebars');

//routes
app.use('/api/products', routesProducts);
app.use('/api/cart', routesCart);
app.use('/home', homeRouter);
app.use('/realTimeProducts', realTimeProducts)

//public
app.use(express.static(__dirname + '/public'));

//Views
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//socket canal abierto
io.on('connection',async (socket) => {
    console.log('Nuevo cliente conectado')

const products = await productManager.getProducts()

    socket.emit('NewProduct', products)

    socket.on( 'NewProduct', (NewProduct) => { 
        productManager.addProduct(NewProduct)
    })
    
    socket.on('ProductDelete', async (ProductDelete) => {
        productManager.deleteProduct(ProductDelete)
        socket.emit('ProductDelete', products)
    })

    })


server.listen(PORT, () => console.log('Servidor escuchando en puerto 8080'));