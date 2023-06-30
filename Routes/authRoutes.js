const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const session = require ('express-session');
const MongoStore = require('connect-mongo');
const User = require('../dao/models/modelUser.js')
const LoginManagerMongo = require('../dao/managersMongoDB/LoginManagerMongo.js')
const loginManagerMongo = new LoginManagerMongo()


router.post('/formRegister', (req, res) => {
    const newUser = req.body
    console.log(newUser)
    loginManagerMongo.saveUser(newUser)
        res.redirect('/api/sessions/loginView') 
})

router.post('/formLogin', async (req, res) => {
    const user = req.body;
    try {
      const userFound = await loginManagerMongo.findUserAndValidate(user);
      if (userFound) {
        req.session.email = user.email;
        req.session.password = user.password;
        res.redirect('/api/sessions/perfilView');
      } else {
        res.send('Email o contraseña incorrecta');
      }
    } catch (error) {
      console.log(error);
      res.send('Error en la validación del usuario');
    }
  });

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err)res.send('Error al cerrar sesión')
        res.redirect('/api/sessions/loginView')
    })
})



module.exports = router