const Cart = require('../models/modelCarts.js')
const Product = require('../models/modelProducts.js');
const ProductClass = require('./products.dao.js');
const productClass = new ProductClass();




class CartClass {
    constructor(){
        
    }
    
    async getCartID(id){
            const CartByID = await Cart.findOne({_id: id}).populate('product.product').lean()
            return CartByID
    } 
    
    readCart(){
        return Cart.find({})
    }

    cartId(_id){
        return Cart.findById(_id)
    }

    addCart = async (cart)=>{
        const newCart = new Cart({product:[]}) 
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
    
   async addProductToCart (id,pid) {
        try {
            const cartID = await this.getCartID(id);
            console.log(cartID);
            const index = cartID.product.findIndex(prod => prod.product._id === pid)
           if (index === -1){ 
                const add = {$push:{product:{product:{_id:pid},quantity:1}}}
                await Cart.updateOne(cartID, add) 
                return "producto agregado"
           } else{
                const filter = { _id: id, 'product.product': pid };
                const update = { $inc: { 'product.$.quantity': 1 } };
                await Cart.updateOne(filter, update);
                return "producto agregado"
           }
        }  catch (error) {
            console.log(error);
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
    getCartByIdMethods = async (_id) => {
        const cartFound = 
            await Cart.findOne({id: _id}).populate('product.product')
                .then(c => console.log(JSON.stringify(c, null, '\t')))
                .catch(err => console.log(err))
        return cartFound
    }

    async UpdateCart(cid){
        try {
            const Cart1 = await this.getCartID(cid);
            Cart1.product = []
            await Cart.updateOne({id: cid},Cart1)
            return "carrito actualizado"
        } catch (error) {
            console.log(error);
        }

    }
    async updateProduct(pid){
        try {
            const Cart1 = await this.cartId(pid);
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