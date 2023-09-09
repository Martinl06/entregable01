const {UserMethods} = require('../dao/factory.js')
const userMethods = new UserMethods()



class UserService {
    constructor(){
    }

    async saveUser(us){
        try{
            const newUser = new userMethods(us).save()
            return await newUser
        }catch(err){
            console.log(err)
        }
    }
    
    // Función para buscar un usuario por email y contraseña y validar los parámetros
    async findUserAndValidate(email, password) {
        try {
          // Buscar el usuario en la base de datos
          const userFind = await userMethods.find(email,password)
          return userFind;
        } catch (err) {
            console.log(err);
        }
     }
    
     async findUserByEmail(email) {
        try{
            return await userMethods.findOne({email: email})
    }catch(err){
        console.log(err)
      }
    }

}

module.exports =  UserService