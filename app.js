//create server
const express = require('express');
const app = express();
const config = require('./dao/config/config.js')
const {addLogger} = require('./loggers/custom.loggers.js')

const MongoStore = require('connect-mongo');
const session = require ('express-session');
const passport = require('passport');
const initializePassport = require('./dao/config/passport.js');
const initializeGithubPassport = require('./dao/config/githubPassport.js');
const path = require('path');
const compression = require('express-compression');

//conect to mongo
const mongoose = require('mongoose');
const MongoManagerDB = require('./dao/mongoDB/mongoDB.js');
const mongoManagerDB = new MongoManagerDB(config.URL_MONGODB);

//import products
const Message = require ('./dao/mongoDB/models/modelMessages.js')
const ProductController = require('./controllers/products.controllers.js');
const ProductService = require('./services/product.services.js')
const productService = new ProductService()

//import routes
const routesMocking = require('./Routes/productsMocking.js');
const routesCart = require('./Routes/cart.js');
const homeRouter = require('./Routes/home.router.js');
const realTimeProducts = require('./Routes/realTimeProducts.js');
const chatRouter = require('./Routes/chat.js');
const allProducts = require('./Routes/allProducts.js')
const login = require('./Routes/login.js')
const authRoutes = require('./Routes/authRoutes.js')
const github = require('./Routes/github.js')
const logger = require('./Routes/loggerTest.js')
const userPremium = require('./Routes/users.js')
const emails = require('./Routes/emails.js')

//import http
const http = require('http')
const server = http.createServer(app)

//import socket
const { Server } = require('socket.io')
const io = new Server(server)


//conect to mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.URL_MONGODB,
    }),
    secret: 'secretCode',
    resave: true,
    saveUninitialized: false,
}))

//compression brotli
app.use(compression({
    brotli: {enabled: true}
}))


//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport
initializePassport()
initializeGithubPassport()
app.use(passport.initialize());
app.use(passport.session());





//Views engine
const handlebars = require('express-handlebars');

//loggers
app.use(addLogger)


//import swagger
const swaggerUIExpress = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info:{
            title: "Documentacion API Ecommerce",
            description: "Documentacion de la API Ecommerce Get clothes" 
        }
    },
    apis:['./docs/**/*.yaml']
}
const specs = swaggerJSDoc(swaggerOptions)
//declare swagger api endpoint
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))



//routes
app.use('/api/productsMocking', routesMocking);
app.use('/api/cart', routesCart);
app.use('/home', homeRouter);
app.use('/realTimeProducts', realTimeProducts)
app.use('/chat', chatRouter)
app.use('/api/products', allProducts)
app.use('/api/sessions', login)
app.use('/api/auth', authRoutes)
app.use('/api/sessions/github', github)
app.use('/loggerTest', logger)
app.use('/api/users', userPremium)
app.use('/emails', emails)


//public
app.use(express.static(path.join(__dirname + '/public')));

//Views
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//socket canal abierto
io.on('connection',async (socket) => {
    console.log('Nuevo cliente conectado!')

const products = await productService.getAllProducts()

    socket.emit('NewProduct', products)

    socket.on( 'NewProduct', async (NewProduct) => { 
       await productService.addProduct(NewProduct)
    })

    socket.on('ProductDelete', async (ProductDelete) => {
       await productService.deleteProduct(ProductDelete)
        socket.emit('ProductDelete', products)
    })

    socket.on('newMessage', async (data) => {
        const message = new Message(data);
        await message.save();
        
        // Después de guardar el nuevo mensaje, emite 'allMessages' a todos los clientes
        const allMessages = await Message.find();
        io.sockets.emit('allMessages', allMessages);

    })

   

})
    

const SERVER_PORT = config.port || 8080;
server.listen(SERVER_PORT, () =>{ 
console.log('Servidor escuchando en puerto: ' + SERVER_PORT)
mongoManagerDB.connectionMongoDB()
});