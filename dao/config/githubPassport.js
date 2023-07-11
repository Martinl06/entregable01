const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportGithub = require('passport-github2').Strategy;
const modelUser = require('../models/modelUser.js')
const fetch = require('node-fetch');


const initializeGithubPassport = () => {
passport.use(
    'auth-Github',
     new passportGithub(
        {
            clientID: 'Iv1.93421613249c301b',
            clientSecret: '7519cd0d302f3c1b1444af4379fe3a0354538171',
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try{

                 // Configuracion para recibir email si esta configurado en privado desde github
        
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accessToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

            let user = await modelUser.findOne({email: profile.email})
            if(!user){
              let newUser ={
                    name: profile._json.name,
                    lastName: profile._json.lastName,
                    userName: profile._json.login,
                    email: profile.email,
                    password: 'no pass',
                    github: true
                }
            
            let result = await modelUser.create(newUser)
            console.log(result)
            return done(null, result)
        }
        else{
            console.log('User already exists')
            return done(null, user)
        }
    }catch(err){
        console.log(err)
        return done(err)
    }
}))

     passport.serializeUser((profile, done) => {
        done(null, profile._id)  //guarda el id del usuario en la sesion y lo serializa 
    }),
    
    passport.deserializeUser(async (id, done) => {
        let user = await modelUser.findById(id) 
        done(null, user) //guarda el usuario en la sesion y lo deserializa
          })
    }




module.exports = initializeGithubPassport   