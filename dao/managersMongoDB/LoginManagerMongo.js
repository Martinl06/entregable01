const User = require('../models/modelUser.js')


class LoginManagerMongo {
    constructor(path){
        this.path = path
}

async saveUser(user){
    try{
        const newUser = new User(user)
        return await newUser.save()
    }catch(err){
        console.log(err)
    }
}

// Función para buscar un usuario por email y contraseña y validar los parámetros
 async findUserAndValidate(email, password) {
    try {
      // Buscar el usuario en la base de datos
      const userFind = await User.findOne( email, password )
  
      // Usuario y contraseña válidos
      return userFind;
    } catch (err) {
        console.log(err);
    }
}

 checkAutentication = (req, res, next) => {
    if(req.session.email && req.session.password){
      //el user esta autenticado y permite el acceso al perfil
        next()
    }else{
      //el user no esta autenticado y lo redirecciona al login
        res.redirect('/api/sessions/loginView')
    }
}


}



module.exports = LoginManagerMongo;