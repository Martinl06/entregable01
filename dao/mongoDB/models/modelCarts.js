const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true,
    },

    product:{
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity:{
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;