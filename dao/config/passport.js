const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modelUser = require('../mongoDB/models/modelUser.js')
const { createPassword, comparePassword } = require('../../utils/bcrypts.js');
const CartService = require('../../services/cart.services.js');
const cartService = new CartService()
const Cart = require('../mongoDB/models/modelCarts.js')





const initializePassport = () => {

    passport.use('passportRegister', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            try{
                let userData = req.body
                //buscar al usuario en la base de datos
                let user = await modelUser.findOne({email: username})
                if(user){
                    console.log('Usuario encontrado')
                    done(null, user)
                
                }
                const email = userData.email;
                
                const newCart = new Cart();
                const role = (email === 'adminCoder@coder.com') ? 'admin' : 'user';
                let userNew = {
                    name: userData.name,
                    lastName: userData.lastName,
                    userName: userData.userName,
                    email: userData.email,
                    role: role,
                    age: userData.age,
                    cart: await newCart.save(),
                    
                    password: createPassword(userData.password),
                }
                
                
                let userResult = await modelUser.create(userNew)
                return done(null, userResult) //se activa serializeUser con el done
                
                

            }catch(err){
                return done("error al crear el user" + err)
            }
        })
    );
    

        passport.use('passportLogin', new LocalStrategy({usernameField:'email'}, async (username, password, done) =>{
            try{
            const user = await modelUser.findOne({email: username})
            if(!user){
                console.log('Usuario no encontrado')
                return done(null, false)
            }
            if(!comparePassword(password, user.password)){
                console.log('Contraseña incorrecta')
                return done (null, false)

            }
            return done(null, user)
        } catch (err) {
            return done(err); // Pasa el error directamente
        }
        }
        )),


passport.serializeUser((user, done) => {
    done(null, user._id)  //guarda el id del usuario en la sesion y lo serializa 
}),

passport.deserializeUser(async (id, done) => {
    let user = await modelUser.findById(id) 
    done(null, user) //guarda el usuario en la sesion y lo deserializa
      })
    
}








module.exports = initializePassport