const UserClass = require('../dao/mongoDB/clases/users.dao.js');
const userClass = new UserClass()



class UserService {
    constructor(){
    }

    async saveUser(us){
        try{
            const newUser = new userClass(us).save()
            return await newUser
        }catch(err){
            console.log(err)
        }
    }
    
    // Función para buscar un usuario por email y contraseña y validar los parámetros
    async findUserAndValidate(email, password) {
        try {
          // Buscar el usuario en la base de datos
          const userFind = await userClass.find(email,password)
          return userFind;
        } catch (err) {
            console.log(err);
        }
     }
    
     async findUserByEmail(email) {
        try{
            return await userClass.findOne({email: email})
    }catch(err){
        console.log(err)
      }
    }

}

module.exports =  UserService