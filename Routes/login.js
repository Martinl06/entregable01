const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const LoginController = require('../controllers/login.controllers')
const {checkAutentication, isUser} = require('../middlewares/authenticator.middlewares.js')






router.use(express.json())

//ruta para obtener el usuario actual
router.get('/current', LoginController.current)


router.get('/login', LoginController.login) 

router.get('/register', LoginController.register)

//ruta para que renderice el perfil del user con los productos 
router.get('/perfil', isUser, checkAutentication, LoginController.perfil)


module.exports = router