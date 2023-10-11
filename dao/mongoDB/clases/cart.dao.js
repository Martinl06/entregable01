const Cart = require('../models/modelCarts.js')
const Product = require('../models/modelProducts.js')


class CartClass {
    constructor(){
    
}


    readCart(){
        return Cart.find({})
    }

    cartId(id){
        return Cart.findOne({_id:id})
    }

    addCart = async (cart)=>{
        const newCart = new Cart({products:[]}) 
        try {
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            console.log(error);
        }
    }

    getCarts = async ()=>{
        try {
            const AllCarts = await Cart.find({});
            return AllCarts;
        } catch (error) {
            console.log(error)
        }
    }   

    async getCartID(id){
        try {
            const CartByID = await Cart.findOne({_id:id}).populate('product.product').lean();
            return CartByID;
        } catch (error) {
            console.log (error);
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
    addProductToCart = async (cid,pid) => {
        try {
            const chooseCart = await this.getCartID(cid);
            const index = chooseCart.product.findIndex(prod => prod.product.id == pid)
           if (index === -1){ 
                const add = {$push:{product:{Product:{_id:pid},quantity:1}}}
                await Cart.updateOne(chooseCart, add) 
                return "producto agregado"
           } else{
                const filter = { _id: cid, 'product.product': pid };
                const update = { $inc: { 'product.$.quantity': 1 } };
                await Cart.updateOne(filter, update);
                return "producto agregado"
           }
        }  catch (error) {
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
            Cart1.product.Product = []
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
    deleteAllProductsFromCart = async (cid) => {
        try {
            const chooseCart = await this.getCartID(cid);
            const resetCart = {$set: {products: []}};
            await Cart.updateOne(chooseCart,resetCart)
            return `el carrito ${cid} fue vaciado`
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports =  CartClass