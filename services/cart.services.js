const CartClass = require('../dao/mongoDB/clases/cart.dao.js')
const cartClass = new CartClass()
const ProductService = require('./product.services.js')
const productService = new ProductService()






class CartService {

        constructor(){
        }


    readCart(){
        return cartClass.readCart()
    }

    cartId(_id){
        return cartClass.cartId(_id)
    }

    async addCart(car){
        return await cartClass.addCart(car)
        
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
            return await cartClass.addProductToCart(cid,pid)
        } catch (error) {
            console.log(error);
        }
    }
    async UpdateCart(cid){
        try {
            return await cartClass.UpdateCart(cid)
        } catch (error) {
            console.log(error);
        }

    }
    async updateProduct(pid){
        try {
            return await cartClass.updateProduct(pid)
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProductFromCart(cid,pid){
        try {
            return await cartClass.deleteProductFromCart(cid,pid)
        } catch (error) {
            console.log(error);
        }
    }
    async updateProductsCart(cartId, arrayproductId) {
        try {
    
          let cart = await cartClass.updateProduct(cartId, arrayproductId)
    
    
          console.log(`The products of cart with id:${cartId} was updated succesfuly`)
          return cart;
    
        } catch (error) {
          console.log("---------------------------------", error)
          throw new Error(error.message);
        }
      }

      async purchase(cartId, user) {
        try {
    
          let cart = await cartClass.findOne(cartId)
          if (cart) {
            // consigue id de productos en cart
            const productIds = cart.products.map(product => product.idProduct.toString());
            // consigue quantity de productos en cart
            const productsQuantity = cart.products.map(quan => quan.quantity)
            // consigue datos de los productos en cart
            const productsData = await productService.getArrProductsData(productIds)
    
            let amount = 0;
            let prodOutStock = []
            let prodStock = []
            // let prodLessStock = []
    
            productsData.map((prod, index) => {
              //Si No hay stock del producto
              if (productsQuantity[index] > prod.stock) {
                //Lo pusheamos al array para luego modificar el cart
                  prodOutStock.push({
                  idProduct: prod._id,
                  quantity: productsQuantity[index]
                });
              }
    
              else { //Si hay stock del product
                //este va a ser el nuevo stock del producto 
                let newStock = prod.stock - (productsQuantity[index])
    
                //Multiplicamos el precio por la cantidad y lo sumamos al total
                let priceProduct = prod.price * (productsQuantity[index])
                amount += priceProduct
                //pusheamos al array para luego modificar el stock del producto con el nuevo stock
                prodStock.push({
                  idProduct: prod._id,
                  stock: newStock
                });
    
              }
            })
    
            //Usamos .createTicket y  Creamos el ticket
    
            const ticket = await TicketService.createTicket({
              amount,
              purchaser: user,//Este es el email del user que lo sacamos de req.session
              // cartId
            })
    
            return {
              ticket,
              prodStock,
              prodOutStock
            }
    
          } else {
            throw new Error('That cart doesnt exist');
          }
    
    
        } catch (error) {
          throw new Error(error.message);
        }
    
      }
      async getPurchase() {
        try {
          const tickets = await TicketService.getTickets();
          return tickets;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      async deletePurchase() {
        try {
          const tickets = await TicketService.deletePurchase();
          return tickets;
        } catch (error) {
          throw new Error(error.message);
        }
      }
  
}


module.exports =  CartService