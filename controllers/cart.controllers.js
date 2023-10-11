const CartService = require('../services/cart.services.js')
const cartService = new CartService()
const TicketService = require('../services/ticket.services.js')
const ticketService = new TicketService()
const ProductService = require('../services/product.services.js')
const productService = new ProductService()


class CartController{


    async getAllCarts (req, res) {
        const carts = await cartService.getCarts()
        res.send({data: carts, message: "Carritos encontrados"})
    }

    //funcion para encontrar un carrito por id con el producto seleccionado
    async getByIdCart (req, res) {
        const id = req.params.id
        const cart = await cartService.getCartID(id)
        const IDCart = req.params.id;
        const product = await productService.getProduct(IDCart)
        res.send({data: cart, message: "Carrito encontrado"})
        
    }

    async createCart (req, res) {
        const NewCart = req.body
        cartService.addCart(NewCart)
        .then(cart =>{
         res.status(201).send({
            msg: "Carrito creado",
            data: cart
         })
        })
        .catch(err => res.status(500).send({err}))
    }

    async deleteCart (req, res) {
        try{
            const id = req.params.id
            const cart = await cartService.deleteCart(id)
            res.status(200).send(cart)
        }catch(err){
            res.status(500).send({err})
        }
    }

    async addProductToCart(req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const cartId = req.user.cart
            const cart = await cartService.getCartID(cartId)
            const productAddedToCart = await cartService.addProductToCart(cid,pid);
            const cart1 = {
                _id: cart._id,
            }
            res.status(200).send({cart1, productAddedToCart});
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
        }
    }

     getProductsInCartController = async (req, res) => {
        const { id } = req.params
        try {
            const cartSelectedPopulated = await cartService.getCartID(id)
            res.status(200).send(cartSelectedPopulated)
        } catch (error) {
            res.status(404).send({ error: 'Error trying create User' })
        }
    }
    
    async getProductAndCart(req, res){

        const IdCart = req.user.cart
        const cart = await cartService.getCartID(IdCart)
        const ID = req.params.id;
        const product1 = await productService.getProduct(ID)
            if (!product1) {
              return res.status(404).send('Producto no encontrado');
            }else{
          
            const productGet = {
              _id: product1._id,
              name: product1.name,
              description: product1.description,
              price: product1.price,
              image: product1.image,
              stock: product1.stock,
              code: product1.code,
              genero: product1.genero,
            };

            const cart1 = {
                id: cart.id,
            
            }

          
            return res.status(200).render('cart', { cart1, productGet });
    }
}

    async UpdateCart(req, res){
        try {
            let cid = req.params.cid;
            const productAddedToCart = await cartService.UpdateCart(cid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
        }
    }

    async UpdateProduct(req, res){
        try {
            let pid = req.params.pid;
            const productUpdated = await cartService.UpdateProduct(pid);
            res.status(200).send(productUpdated);
        } catch (error) {
            res.status(500).send(`Error al actualizar producto del carrito: ${error}`)   
        }
    }

    async deleteProductFromCart(cid,pid){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productDeletedFromCart = await cartService.deleteProductFromCart(cid,pid);
            res.status(200).send(productDeletedFromCart);
        } catch (error) {
            res.status(500).send(`Error al eliminar producto del carrito: ${error}`)   
        }
    }

    async purchase(req, res) {
        try {
            const cid = req.params.cid
            const user= req.session.user.email
            // const user = req.body.email
            const newTicket = await cartService.purchase(cid, user)
            await cartService.updateProductsCart(cid, newTicket.prodOutStock )
            await ticketService.updateStock(newTicket.prod)
            const newTk = {
                id: newTicket.ticket._id,
                amount: newTicket.ticket.amount,
                purchaser:newTicket.ticket.purchaser
            }
            return res.status(200).render('purchased', { newTk })

        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
    async getPurchase(req, res) {
        try {

            const ticket = await cartService.getPurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
    async deletePurchase(req, res) {
        try {

            const ticket = await cartService.deletePurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
        
        



}


module.exports = new CartController()