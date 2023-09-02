const Message = require('../models/modelMessages.js')


class ChatClass{
    
        async addMessage(message){
            try{
                const newMessage = new Message(message).save()
                return await newMessage
            }catch(err){
                console.log(err)
            }
        }
    
        async getAllMessages(){
            try{
                return await Message.find({})
            }catch(err){
                console.log(err)
            }
        }
    }

module.exports =  ChatClass