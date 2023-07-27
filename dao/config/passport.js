const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modelUser = require('../models/modelUser.js')
const { createPassword, comparePassword } = require('../../utils/bcrypts.js');
const CartManagerMongo = require('../managersMongoDB/CartManagerMongo.js')
const cartManagerMongo = new CartManagerMongo();


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
                const cart = {}
                const date = new Date();
                cart.date = date;
                const newCart = await cartManagerMongo.addCart(cart)
                const role = (email === 'adminCoder@coder.com') ? 'admin' : 'user';
                let userNew = {
                    name: userData.name,
                    lastName: userData.lastName,
                    userName: userData.userName,
                    email: userData.email,
                    role: role,
                    age: userData.age,
                    cart: newCart,
                    date: date,
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
            }catch{
                return done("error al validar user" + err)
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