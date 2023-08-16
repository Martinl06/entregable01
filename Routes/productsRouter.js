const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../controllers/products.controllers')



function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}


router.use(express.json())



router.get('/', checkAutentication, ProductController.getAll)

router.get('/:id', ProductController.getById )

router.post('/createProduct', ProductController.create )

router.delete('/deleteProduct/:id', ProductController.deleteProduct )

router.put('/updateProduct/:id', ProductController.updateProduct)


module.exports = router