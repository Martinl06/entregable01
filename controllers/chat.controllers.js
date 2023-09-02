const ChatService = require('../services/chat.services.js')
const chatService = new ChatService()


class MessageController{

    
    async addMessage(req, res){
        try {
            const message = req.body
            const newMessage = await chatService.addMessage(message)
            res.status(201).send({data: newMessage, message: "Mensaje creado"})
        } catch (error) {
            res.status(500).send(`Error al crear mensaje: ${error}`)
        }
    }
    
    
    async getAllMessages(req, res){
        try {
            const messages = await chatService.getAllMessages()
            return res.status(200).render('chat', {messages})
        } catch (error) {
            res.status(500).send(`Error al buscar mensajes: ${error}`)
        }
    }

}

module.exports = new MessageController()