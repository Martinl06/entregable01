//create server
const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;

//conect to mongo
const mongoose = require('mongoose');
const MongoManagerDB = require('./dao/mongoDB/mongoDB.js');
const mongoManagerDB = new MongoManagerDB('mongodb+srv://martinlujan0666:Martin1470@ecommerce.v4lpkit.mongodb.net/ecommerce');

//import products
const ProductManager = require('./dao/managers/ProductManager');
const productManager = new ProductManager('./utils/products.json');
const CartManager = require('./dao/managers/CartManager');
const cartManager = new CartManager('./utils/Carrito.json');
const ProductManagerMongo = require('./dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Message = require ('./dao/models/modelMessages.js')

//import routes
const routesProducts = require('./Routes/products.js');
const routesCart = require('./Routes/cart.js');
const homeRouter = require('./Routes/home.router.js')
const realTimeProducts = require('./Routes/realTimeProducts.js')
const chatRouter = require('./Routes/chat.js')

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
app.use('/chat', chatRouter)

//public
app.use(express.static(__dirname + '/public'));

//Views
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//socket canal abierto
io.on('connection',async (socket) => {
    console.log('Nuevo cliente conectado')

const products = await productManagerMongo.getProducts()

    socket.emit('NewProduct', products)

    socket.on( 'NewProduct', async (NewProduct) => { 
        productManagerMongo.addProduct(NewProduct)
    })

    socket.on('ProductDelete', async (ProductDelete) => {
        productManagerMongo.deleteProduct(ProductDelete)
        socket.emit('ProductDelete', products)
    })



    socket.on('newMessage', async (data) => {
        console.log(data)
        const messages =  new Message(data)
        await messages.save()
        io.sockets.emit('allMessages', messages)
        //const newMessage = new Message(data)
        //await newMessage.save(data)
        //io.sockets.emit('allMessages', newMessage)
        })

        })
    


server.listen(PORT, () =>{ 
console.log('Servidor escuchando en puerto 8080')
mongoManagerDB.connectionMongoDB()
});