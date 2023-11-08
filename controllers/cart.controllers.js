const CartService = require('../services/cart.services.js')
const cartService = new CartService()
const TicketService = require('../services/ticket.services.js')
const ticketService = new TicketService()
const ProductService = require('../services/product.services.js')
const productService = new ProductService()
const Cart = require('../dao/mongoDB/models/modelCarts.js')


class CartController{


    async getAllCarts (req, res) {
        const carts = await cartService.getCarts()
        res.send({data: carts, message: "Carritos encontrados"})
    }

    
    async getCart (req, res) {
        try {
            let cid = req.params.cid;
            const cartID = await cartService.getCartID(cid);
            if (!cartID) return "carrito no encontrado";
            res.status(200).render('cart', { cart: cartID });
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)   
        }
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

    async addProductToCart  (req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productAddedToCart = await cartService.addProductToCart(cid, pid);
            res.redirect('/home')
        } catch (error) {
        res.status(500).send(`error: ${error.Error}`)   
        } 
    }

        //funcion para encontrar el carrito por id
        async getCartID (req, res) {
            const id = req.params.id
            const cart = await cartService.getCartID(id)
            const IDCart = req.params.id;
            console.log(IDCart)
            const product = await productService.getProduct(IDCart)
            res.send({data: cart, message: "Carrito encontrado"})
            
        }



    async UpdateCart(req, res){
        try {
            let cid = req.params.cid;
            const productAddedToCart = await cartService.UpdateCart(cid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error.Error}`)   
        }
    }

    async UpdateProduct(req, res){
        try {
            let pid = req.params.pid;
            const productUpdated = await cartService.UpdateProduct(pid);
            res.status(200).send(productUpdated);
        } catch (error) {
            res.status(500).send(`Error al actualizar producto del carrito: ${error.Error}`)   
        }
    }

    async deleteProductFromCart(cid,pid){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productDeletedFromCart = await cartService.deleteProductFromCart(cid,pid);
            res.status(200).send(productDeletedFromCart);
        } catch (error) {
            res.status(500).send(`Error al eliminar producto del carrito: ${error.Error}`)   
        }
    }

    async purchase(req, res) {
        try {
            const cid = req.params.cid
            const user= req.session.user.email
            const newTicket = await cartService.purchase(cid, user)
            await cartService.updateProductsCart(cid, newTicket.prodOutStock )
            await ticketService.updateStock(newTicket.prod)
            const newTk = {
                id: newTicket.ticket._id,
                amount: newTicket.ticket.amount,
                purchaser:newTicket.ticket.purchaser,
                code: newTicket.ticket.code,
                purchase_datetime: newTicket.ticket.purchase_datetime,
                

            }
            return res.status(200).render('purchase', { newTk })

        } catch (error) {
            return res.status(500).send(`Error al realizar la compra: ${error.Error}`)
        }
    }
    async getPurchase(req, res) {
        try {

            const ticket = await cartService.getPurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.Error })
        }
    }
    async deletePurchase(req, res) {
        try {

            const ticket = await cartService.deletePurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.Error })
        }
    }
   
}


module.exports = new CartController()