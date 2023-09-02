const {TicketMethods, ProductMethods} = require('../dao/factory.js')
const ticketMethods = new TicketMethods()
const productMethods = new ProductMethods()
const ProductService = require('./product.services.js')
const productService = new ProductService()


class TicketService {
    constructor() {


    }

    async createTicket(ticket) {
        try {
            return await ticketMethods.create(ticket)
        } catch (err) {
            console.log(err)
        }
    }

    async updateStock(prod) {
        prod.map(async (prod) => {
            await productService.updateStockProduct(prod.idProduct, prod.stock)
            console.log("se modifico stock de los product",prodStock);
    
        })
    }

    async getTickets() {
        const newTk = await ticketMethods.getAll();
        return newTk

    }
    async deletePurchase() {
        const newTk = await ticketMethods.deletePurchase();
        return newTk

    }

}


module.exports = TicketService