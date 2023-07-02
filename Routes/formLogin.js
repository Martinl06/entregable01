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



//middleware para validar la autenticacion del user
function checkAutentication (req, res, next) {
    if(req.session.email && req.session.password){
       //el user esta autenticado y permite el acceso al perfil
         next()
     }else{
       //el user no esta autenticado y lo redirecciona al login
         res.redirect('/api/sessions/loginView')
     }
 }

router.use(express.json())


router.get('/loginView', (req, res) => {
    res.render('formLogin', {})
})

router.get('/registerView', (req, res) => {
    res.render('formRegister', {})
})

//ruta para que renderice el perfil del user con los productos 
router.get('/perfilView', checkAutentication,  async (req, res) => {
    const email = req.session.email
    const password = req.session.password
    const role = (email === 'adminCoder@coder.com' && password === 'admin2023') ? 'Admin' : 'User';
    req.session.role = role
    console.log(role)
    //busca el usuario de la db y lo guarda en una constante
    const userFind = await loginManagerMongo.findUserByEmail(email, password, userName)


    //si el usuario ya esta registrado, no lo deja registrarse de nuevo
    if(userFind){
        return res.status(400).send('El usuario ya esta registrado')
    }
    const user = {
        email: email,
        role: role,
        password: password,
    }
    console.log(user)
    
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
    return res.status(200).render('formPerfil',{productsArray, user, pagination: rest, links})
    

})


module.exports = router