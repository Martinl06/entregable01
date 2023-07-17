const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require('../dao/managers/CartManager');
const cartManager = new CartManager('./utils/carrito.json');
const CartManagerMongo = require('../dao/managersMongoDB/CartManagerMongo');
const cartManagerMongo = new CartManagerMongo();
const Cart = require('../dao/models/modelCarts')
const uuid4 = require('uuid4')


function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}


router.use(express.json())


router.post('/', checkAutentication,  (req, res) => {
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

//agrega el carrito con el producto seleccionado
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
router.delete('/:cid/products/:pid ', (req, res) => {
   try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const productDeletedFromCart = cartManagerMongo.deleteProductFromCart(cid,pid);
    res.status(200).send(productDeletedFromCart);
   } catch (error) {
    res.status(500).send(`Error al eliminar producto del carrito: ${error}`)   
   }
})

//actualiza el carrito con un arreglo de productos
router.put('/cart/:cid', (req, res) => {
    try{
        let cid = req.params.cid;
        const cartUpdated = cartManagerMongo.UpdateCart(cid);
        res.status(200).send(cartUpdated);
    }catch(error){
        res.status(500).send(`Error al actualizar carrito: ${error}`)   
    }   
})
//actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/cart/:cid/products/:pid', (req, res) => {
    try{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const productUpdated = cartManagerMongo.UpdateProduct(cid,pid);
        res.status(200).send(productUpdated);
    }catch(error){
        res.status(500).send(`Error al actualizar producto del carrito: ${error}`)   
    }
})
//elimina todos los productos del carrito
router.delete('/cart/:cid', (req, res) => {
    try{
        let cid = req.params.cid;
        const cartDeleted = cartManagerMongo.deleteCart(cid);
        res.status(200).send(cartDeleted);
    }catch(error){
        res.status(500).send(`Error al eliminar carrito: ${error}`)   
    }
})

module.exports = router;