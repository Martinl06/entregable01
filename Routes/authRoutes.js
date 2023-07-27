const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const session = require ('express-session');
const MongoStore = require('connect-mongo');
const User = require('../dao/models/modelUser.js')
const LoginManagerMongo = require('../dao/managersMongoDB/LoginManagerMongo.js')
const loginManagerMongo = new LoginManagerMongo()
const passport = require('passport');



router.post('/Register', passport.authenticate('passportRegister', {failureRedirect:'/'}), (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, lastName: req.user.lastName, userName: req.user.userName, role: req.user.role};
  res.redirect('/api/sessions/login') 
})

router.post('/login', passport.authenticate('passportLogin', {failureRedirect:'/api/sessions/login'}), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = { _id: req.user._id, name: req.user.name, email: req.user.email, lastName: req.user.lastName, userName: req.user.userName, role: req.user.role, age: req.user.age, cart: req.user.cart, password: req.user.password};
console.log( req.session.user)
return res.redirect('/api/sessions/perfil');
 
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err)res.send('Error al cerrar sesión')
        res.redirect('/api/sessions/login')
    })
})




module.exports = router