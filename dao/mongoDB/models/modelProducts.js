const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
    },
    genero:{
        type: String,
        required: true,
        index: true
    },
    owner:{
        type:  String,
        ref: 'user',
        default: 'user',
    }
})

productSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Product', productSchema)

module.exports = Product;