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


router.post('/formRegister', passport.authenticate('passportRegister', {failureRedirect:'/api/session/failedregister'}), (req, res) => {
     res.redirect('/api/sessions/loginView') 
})

router.post('/formLogin', passport.authenticate('passportLogin', {failureRedirect:'/api/sessions/failLogin'}), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, lastName: req.user.lastName, userName: req.user.userName, role: req.user.role };
console.log( req.session.user)
return res.redirect('/api/sessions/perfilView');
 
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err)res.send('Error al cerrar sesión')
        res.redirect('/api/sessions/loginView')
    })
})




module.exports = router