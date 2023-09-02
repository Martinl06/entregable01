const UserService = require('../services/users.services.js')


class UserController{

    async saveUser(user){
        try{
            const newUser = UserService.saveUser(user)
            return await newUser
        }catch(err){
            console.log(err)
        }
    }
    
    // Función para buscar un usuario por email y contraseña y validar los parámetros
    async findUserAndValidate(email, password) {
        try {
          // Buscar el usuario en la base de datos
          const userFind = await UserService.findUserAndValidate(email,password)
          return userFind;
        } catch (err) {
            console.log(err);
        }
     }
    
     async findUserByEmail(email) {
        try{
            return await UserService.findUserByEmail(email)
    }catch(err){
        console.log(err)
      }
    }

}

module.exports = new UserController()




