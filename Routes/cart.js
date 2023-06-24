const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require('../dao/managers/CartManager');
const cartManager = new CartManager('./utils/carrito.json');
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const Cart = require('../dao/models/modelCarts')
const uuid4 = require('uuid4')

router.use(express.json())


router.post('/', (req, res) => {
    const NewCart = req.body
    const cart = new Cart(NewCart)
    cartManagerMongo.addCart(cart)
    .then(cart =>{
        res.status(201).send({
            msg: "Carrito creado",
            data: cart
        })
    })
    .catch(err => res.status(500).send({err}))
})

router.get('/', (req, res) => {
    const carts = cartManagerMongo.getCarts()
    res.send({data: carts, message: "Carritos encontrados"})
})


router.post('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        const productAddedToCart = await cartManagerMongo.addProductToCart(cid,pid);

        res.status(200).send(productAddedToCart);
    } catch (error) {
        res.status(500).send(`Error al agregar producto al carrito: ${error}`)   
    }

    
})



//elimina el producto seleccionado del carrito
router.delete('api/cart/:cid/products/:pid ', (req, res) => {
    const { cid, pid } = req.params
    const cart = cartManagerMongo.deleteProduct(cid, pid)
    res.send({data: cart, message: "Producto eliminado del carrito"})
})

//actualiza el carrito con un arreglo de productos
router.put('/cart/:cid', (req, res) => {
    const { cid } = req.params
    const cart = cartManagerMongo.updateCart(cid)
    res.send({data: cart, message: "Carrito actualizado"})
})
//actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/cart/:cid/products/:pid', (req, res) => {
    const { cid, pid } = req.params
    const cart = cartManagerMongo.updateProduct(cid, pid)
    res.send({data: cart, message: "Producto actualizado"})
})
//elimina todos los productos del carrito
router.delete('/cart/:cid', (req, res) => {
    const { _id } = req.params
    const cart = cartManagerMongo.deleteCart(_id)
    res.send({data: cart, message: "Carrito eliminado"})
})

module.exports = router;