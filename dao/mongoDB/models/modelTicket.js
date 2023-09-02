const moongoose = require('mongoose');

const ticketSchema = new moongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
})

const Ticket = moongoose.model('Ticket', ticketSchema)

module.exports = Ticket;