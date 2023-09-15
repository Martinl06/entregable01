const ChatClass = require('../dao/mongoDB/clases/chat.dao.js')
const chatClass = new ChatClass()





class ChatService{
    constructor(){
    }
    
    async addMessage(mess){
        try{
            return await chatClass.addMessage(mess)
        }catch(err){
            console.log(err)
        }
    }

    async getAllMessages(){
        try{
            return await chatClass
        }catch(err){
            console.log(err)
        }
    }
}

module.exports =  ChatService