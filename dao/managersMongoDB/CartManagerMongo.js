const Cart = require('../models/modelCarts')

class CartManagerMongo{
    constructor(path){
        this.path = path
    }

    readCart(){
        return Cart.find({})
    }

    cartId(id){
        return Cart.findById(id)
    }

    writeCart(cart){
        return cart.save()
    }

    async addCart(){
        const newCart = new Cart()
        return await this.writeCart(newCart)
    }

    async getCarts(){
        return await this.readCart()
    }

    async getCartID(id){
        const cart = await this.cartId(id)
        if(!cart){
            return "No existe el carrito"
        }else{
            return cart
        }
    }
}

module.exports = CartManagerMongo;