const passport = require('passport');
const sweetalert2 = require('sweetalert2');


class AuthController{

    async authRegister(req, res){
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
          }
          req.session.user = { _id: req.user._id, email: req.user.email, lastName: req.user.lastName, userName: req.user.userName, role: req.user.role};
          res.redirect('/api/sessions/login') 

    }

    async authLogin(req, res){
        if (!req.user) {
            return res.json({ error: 'invalid credentials' })
          }
          req.session.user = { _id: req.user._id, name: req.user.name, email: req.user.email, lastName: req.user.lastName, userName: req.user.userName, role: req.user.role, age: req.user.age, cart: req.user.cart, password: req.user.password};
        console.log( req.session.user)
        return res.redirect('/api/sessions/perfil');
    }


    async authLogout(req, res){
        req.session.destroy(err => {
            if(err)res.send('Error al cerrar sesión')
            res.redirect('/api/sessions/login')
        })
    }



}


module.exports = new AuthController()