const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js');
const productManager = new ProductManager('./products.json');
const routesProducts = require('./Routes/products.js');
const routesCart = require('./Routes/cart.js');
const PORT = 8080 || process.env.PORT;
const homeRouter = require('./Routes/home.router.js')
const realTimeProducts = require('./Routes/realTimeProducts.js')

const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)
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

//socket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')})


server.listen(PORT, () => console.log('Servidor escuchando en puerto 8080'));