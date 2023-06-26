const Cart = require('../models/modelCarts')
const Product = require('../models/modelProducts')
 

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

    async getCartID(_id){
        const cart = await this.cartId(_id)
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
    async addProductToCart(cid,pid){
        try {
            const Cart1 = await this.getCartID(cid);
            const ProductToSelect = await Product.findById(pid);
            Cart1.product.push({product: ProductToSelect})
            await Cart.updateOne({_id: cid},Cart1)
            return "producto agregado"
        } catch (error) {
            console.log(error);
        }
    }
    async UpdateCart(cid){
        try {
            const Cart1 = await this.getCartID(cid);
            Cart1.product = []
            await Cart.updateOne({_id: cid},Cart1)
            return "carrito actualizado"
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(pid){
        try {
            const Cart1 = await this.getCartID(pid);
            Cart1.product.product = []
            await Cart.updateOne({_id: pid},Cart1)
            return "producto actualizado"
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProductFromCart(cid,pid){
        try {
            const Cart1 = await this.getCartID(cid);
            Cart1.product.pull({product: pid})
            await Cart.updateOne({_id: cid},Cart1)
            return "producto eliminado"
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = CartManagerMongo;