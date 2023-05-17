const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require('../ProductManager.js');
const productManager = new ProductManager('./products.json');
const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carrito.json');




router.post('/', (req, res) => {
  let carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  let newCart = {
    id: generateUniqueId(), 
    products: [],
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.json(newCart);
});

router.get('/:cid', (req, res) => {
  let carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  let cart = carts.find((c) => c.id == req.params.cid);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
  let carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  let cartIndex = carts.findIndex((c) => c.id == req.params.cid);
  if (cartIndex == -1) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  let cart = carts[cartIndex];
  let existingProduct = cart.products.find((p) => p.product == req.params.pid);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({
      product: req.params.pid,
      quantity: 1,
    });
  }
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.json(cart.products);
});


function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}








module.exports = router;