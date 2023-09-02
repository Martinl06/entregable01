const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true,
    },
    /*_Id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },*/
    product:{
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            }
        ]
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;