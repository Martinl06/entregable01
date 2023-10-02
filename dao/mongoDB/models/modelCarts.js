const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

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
                _id:{
                    type: mongoose.Schema.Types.ObjectId,
                    strict: false
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