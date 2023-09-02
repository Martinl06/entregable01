const CartService = require('../services/cart.services.js')
const cartService = new CartService()
const TicketService = require('../services/ticket.services.js')
const ticketService = new TicketService()


class CartController{


    async getAllCarts (req, res) {
        const carts = await cartService.getCarts()
        res.send({data: carts, message: "Carritos encontrados"})
    }

    async getByIdCart (req, res) {
        const id = req.params.id
        const cart = await cartService.getCartID(id)
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
            const productAddedToCart = await cartService.addProductToCart(cid,pid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
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