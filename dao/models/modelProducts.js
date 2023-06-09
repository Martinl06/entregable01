const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,

    },

    code:{
        type: String,
        required: true
    },

    thumbnail: {
        type: String

    },
    
    stock: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;