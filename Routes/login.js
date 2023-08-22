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
const LoginController = require('../controllers/login.controllers')

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

//ruta para obtener el usuario actual
router.get('/current', LoginController.current)


router.get('/login', LoginController.login) 

router.get('/register', LoginController.register)

//ruta para que renderice el perfil del user con los productos 
router.get('/perfil', isUser, checkAutentication, LoginController.perfil)


module.exports = router