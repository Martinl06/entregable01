const express = require('express')
const { Router } = express
const router = new Router() 
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js')
const LoginController = require('../controllers/login.controllers.js')

router.get('/premium/:id', checkAutentication, LoginController.changeRol )



module.exports = router