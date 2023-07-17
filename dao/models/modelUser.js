const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,  
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    admin:{
        type: Boolean,
        default: false
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;