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
    age:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: ['user', 'admin', 'premium'],
        unique: false,
        default: 'user'
    },   
    admin:{
        type: Boolean,
        default: false
    },
    cart:{
        type:
        {
            cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cart'
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;