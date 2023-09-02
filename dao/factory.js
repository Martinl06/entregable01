const config = require('./config/config.js')
const CartDAO = require('./mongoDB/clases/cart.dao.js')
const ProductDAO = require('./mongoDB/clases/products.dao.js')
const MessageDAO = require('./mongoDB/clases/chat.dao.js')
const UserDAO = require('./mongoDB/clases/users.dao.js')
const TicketDAO = require ('./mongoDB/models/modelTicket.js')
const CartFS = require('./fs/clases/managers/CartManager.js')
const ProductFS = require('./fs/clases/managers/ProductManager.js')


let CartMethods;
let ProductMethods;
let MessageMethods;
let UserMethods;
let TicketMethods;
let productsFS;
let cartsFS;

switch (config.persistence) {
    case 'MONGODB':
        CartMethods = CartDAO;
        ProductMethods = ProductDAO;
        MessageMethods = MessageDAO;
        UserMethods = UserDAO;
        TicketMethods = TicketDAO;
        break;
    case 'fs':
        CartMethods = CartFS;
        ProductMethods = ProductFS;
        break;
    default:
        break;

}

module.exports = {
    CartMethods,
    ProductMethods,
    MessageMethods,
    UserMethods,
    TicketMethods,
    productsFS,
    cartsFS
}