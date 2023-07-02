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
      const userFind = await User.find(email,password)
  
      // Usuario y contraseña válidos
      return userFind;
    } catch (err) {
        console.log(err);
    }
 }
async findUserByEmail(email, password, userName) {
    try{
        return await User.findOne({email: email, password: password, userName: userName})
}catch(err){
    console.log(err)
  }
}

}


module.exports = LoginManagerMongo;