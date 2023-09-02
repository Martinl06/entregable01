const {MessageMethods} = require ('../dao/factory.js')
const messageMethods = new MessageMethods()




class ChatService{
    constructor(){
    }
    
    async addMessage(mess){
        try{
            return await messageMethods.addMessage(mess)
        }catch(err){
            console.log(err)
        }
    }

    async getAllMessages(){
        try{
            return await messageMethods
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = ChatService