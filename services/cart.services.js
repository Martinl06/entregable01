const CartClass = require('../dao/mongoDB/clases/cart.dao.js')
const cartClass = new CartClass()
const ProductService = require('./product.services.js')
const productService = new ProductService()
const Cart = require('../dao/mongoDB/models/modelCarts.js')
const ProductClass = require('../dao/mongoDB/clases/products.dao.js')
const productClass = new ProductClass()
const TicketService = require('./ticket.services.js')
const ticketService = new TicketService()






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

    async getCartID(cid){
            const CartByID = await cartClass.getCartID(cid)
            return CartByID;
    } 

    async deleteCart(_id){
        const cart = await this.cartId(_id)
        if(!cart){
            return "No existe el carrito"
        }else{
            return cart.deleteOne()
        }
    }

  

  async addProductToCart(cid, pid) {
    try {
        const cartID = await cartClass.cartId(cid);
        console.log(cartID);
        
        // Verificar si el producto ya está en el carrito
        const productIndex = cartID.product.find((pId) => pId.product.equals(pid));

        if (productIndex) {
            productIndex.quantity+=1;
        } else {
            cartID.product.push({ product: pid, quantity: 1 });
        }

        // Calcular la suma total de productos en el carrito
        const totalQuantity = cartID.product.reduce((total, product) => total + product.quantity, 0);

        // Calcular el total de precios de los productos en el carrito (considerando el precio de cada producto)
        const totalPrice = cartID.product.reduce((total, product) => {
            const productData =  productClass.getProductPriceFromDatabase(product.product);
            return total + productData.price * product.quantity;
        }, 0);

        // Actualizar la cantidad total y el total de precios en el carrito
        cartID.totalQuantity = totalQuantity;
        cartID.totalPrice = totalPrice;

        // Guardamos el carrito actualizado
        await cartID.save();

        return `Producto agregado al carrito. Total de productos: ${totalQuantity}, Total: ${totalPrice}`;
    } catch (error) {
        console.log(error);
        return "Hubo un error al agregar el producto al carrito";
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
          console.log(error)
          throw new Error(error.message);
        }
      }

      async purchase(cartId, user) {
        try {
    
          let cart = await cartClass.cartId(cartId)
          console.log(cart)
          if (cart) {
            // consigue id de productos en cart
            const productIds = cart.product.map(id => id.product)
            // consigue quantity de productos en cart
            const productsQuantity = cart.product.map(quan => quan.quantity)
            // consigue datos de los productos en cart
            const productsData = await productService.getArrProductsData(productIds)
            console.log(productsData)
    
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
    
            const ticket = await ticketService.createTicket({
              code: Math.floor(Math.random() * (100000 - 1)) + 1,
              purchase_datetime: new Date(),
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