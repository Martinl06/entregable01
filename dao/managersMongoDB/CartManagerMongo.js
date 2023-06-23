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

    async addCart(cart){
        const newCart = new Cart(cart)
        return await newCart.save()
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
    async deleteCart(_id){
        const cart = await this.cartId(_id)
        if(!cart){
            return "No existe el carrito"
        }else{
            return cart.deleteOne()
        }
    }
    async addProductToCart(){
       const cart1 = await Cart.findOne({_id:'6494ef245475a6b6f42c7195'})
       cart1.product.push({product: '5f9b3b4b9b0b3b2a3c9b4b9b'})

    }
}


module.exports = CartManagerMongo;