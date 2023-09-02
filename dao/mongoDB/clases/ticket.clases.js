const Ticket = require('../models/modelTicket');


class TicketClass{

        async create(newTicket){
            const newTk = await Ticket.create(newTicket)
            return newTk
                    }
                    
        async getAll(){
            const newTk = await Ticket.find({})
            return newTk
                    }

        async deletePurchase(){
            const newTk = await Ticket.deleteMany({})
            return newTk
                    }
        
}


module.exports = TicketClass;