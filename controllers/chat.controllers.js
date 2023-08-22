const Message = require('../dao/models/modelMessages')


class MessageController{

    async addMessage(req, res){
            const NewMessage = req.body
            const message = new Message(NewMessage)
            message.save()
            .then(message =>{
                res.status(201).send({
                    msg: "Mensaje creado",
                    data: message
                })
            })
            .catch(err => res.status(500).send({err}))
        }
    

    async getAllMessages(req, res){
            Message.find()
            .then(messages => {
                if(messages.length) return res.status(200).render('chat', {messages})
                return res.status(204).send({data: messages, message: "No hay mensajes"})
            })
            .catch(err => res.status(500).send({err}))
          }
    }



module.exports = new MessageController()