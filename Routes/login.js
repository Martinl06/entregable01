const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const session = require ('express-session');
const MongoStore = require('connect-mongo');
const ProductManagerMongo = require('../dao/managersMongoDB/ProductManagerMongo');
const productManagerMongo = new ProductManagerMongo();
const Product = require('../dao/models/modelProducts')
const LoginManagerMongo = require('../dao/managersMongoDB/LoginManagerMongo.js')
const loginManagerMongo = new LoginManagerMongo()

//middleware para verificar si el user esta logueado
function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}



function isUser(req, res, next) {
    if (req.session?.user?.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'error de autenticacion!' });
  }
  



router.use(express.json())


router.get('/login', (req, res) => {
    res.render('login', {})
})

router.get('/register', (req, res) => {
    const email = req.session.user
    const admin = (email === 'adminCoder@coder.com') ? 'admin' : 'user';
    const user = {
      email: email,
      role: admin,
  }   
    res.render('register', {})
})

//ruta para que renderice el perfil del user con los productos 
router.get('/perfil', isUser, checkAutentication, async (req, res) => {
    const {email, role, password} = req.session.user
    
    const user = {
        email: email,
        role: role,
        password: password,
    }
    //console.log(user)
    
    //renderiza los productos con paginacion en el perfil del user
    const {page, limit} = req.query
    const products = await productManagerMongo.getAll(page, limit)
    //console.log(products)
    let productsArray = products.docs.map((product)=>{
        return {
            name: product.name,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
            genero: product.genero
        }
    })
    const {docs , ...rest} = products
    let links = []

    for (let i = 1; i <= rest.totalPages + 1; i++) {
        links.push({label:i, href:'http://localhost:8080/products/?page=' + i})
    }
    return res.status(200).render('perfil',{productsArray, user, pagination: rest, links})
    



})


module.exports = router