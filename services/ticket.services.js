const TicketClass = require('../dao/mongoDB/clases/ticket.clases.js')
const ticketClass = new TicketClass()
const ProductService = require('./product.services.js')
const productService = new ProductService()


class TicketService {
    constructor() {


    }

    async createTicket(ticket) {
        try {
            return await ticketClass.create(ticket)
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
        const newTk = await ticketClass.getAll();
        return newTk

    }
    async deletePurchase() {
        const newTk = await ticketClass.deletePurchase();
        return newTk

    }

}


module.exports = TicketService