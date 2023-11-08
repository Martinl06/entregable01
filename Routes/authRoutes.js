const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controllers');



router.post('/Register', passport.authenticate('passportRegister', {failureRedirect:'/'}),AuthController.authRegister);

router.post('/login', passport.authenticate('passportLogin', {failureRedirect:'/api/sessions/login' }),AuthController.authLogin);

router.get('/logout', AuthController.authLogout )




module.exports = router