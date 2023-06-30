const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const session = require ('express-session');
const LoginManagerMongo = require('../dao/managersMongoDB/LoginManagerMongo.js')
const loginManagerMongo = new LoginManagerMongo()



router.use(express.json())


router.get('/loginView', (req, res) => {
    res.render('formLogin', {})
})

router.get('/registerView', (req, res) => {
    res.render('formRegister', {})
})
router.get('/perfilView', (req, res) => {
    res.render('formPerfil', {})
})


module.exports = router