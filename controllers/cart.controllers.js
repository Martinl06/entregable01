const CartService = require('../services/cart.services')
const Cart = require('../dao/models/modelCarts.js')

class CartController{


    async getAllCarts (req, res) {
        const carts = await CartService.getCarts()
        res.send({data: carts, message: "Carritos encontrados"})
    }

    async getByIdCart (req, res) {
        const id = req.params.id
        const cart = await CartService.getCartID(id)
        res.send({data: cart, message: "Carrito encontrado"})
    }

    async createCart (req, res) {
        const NewCart = req.body
        CartService.addCart(NewCart)
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
            const cart = await CartService.deleteCart(id)
            res.status(200).send(cart)
        }catch(err){
            res.status(500).send({err})
        }
    }

    async addProductToCart(req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productAddedToCart = await CartService.addProductToCart(cid,pid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
        }
    }

    async UpdateCart(req, res){
        try {
            let cid = req.params.cid;
            const productAddedToCart = await CartService.UpdateCart(cid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
            res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
        }
    }

    async UpdateProduct(req, res){
        try {
            let pid = req.params.pid;
            const productUpdated = await CartService.UpdateProduct(pid);
            res.status(200).send(productUpdated);
        } catch (error) {
            res.status(500).send(`Error al actualizar producto del carrito: ${error}`)   
        }
    }

    async deleteProductFromCart(cid,pid){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productDeletedFromCart = await CartService.deleteProductFromCart(cid,pid);
            res.status(200).send(productDeletedFromCart);
        } catch (error) {
            res.status(500).send(`Error al eliminar producto del carrito: ${error}`)   
        }
    }
}


module.exports = new CartController()