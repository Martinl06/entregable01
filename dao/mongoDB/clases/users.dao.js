const User = require('../models/modelUser.js');



class UserClass{


    async saveUser(user){
        try{
            const newUser = new User(user).save()
            return await newUser
        }catch(err){
            console.log(err)
        }
    }
    
    // Función para buscar un usuario por email y contraseña y validar los parámetros
    async findUserAndValidate(email, password) {
        try {
          // Buscar el usuario en la base de datos
          const userFind = await User.find(email,password)
          return userFind;
        } catch (err) {
            console.log(err);
        }
     }
    
     async findUserByEmail(email) {
        try{
            return await User.findOne({email: email})
    }catch(err){
        console.log(err)
      }
    }

}

module.exports = UserClass