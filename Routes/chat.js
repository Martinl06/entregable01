const express = require('express')
const { Router } = express
const router = new Router()
const Message = require('../dao/models/modelMessages')

router.use(express.json())

router.get('/', (req, res) => {
    res.render('chat',{})
  })

router.post('/', (req, res) => {
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
})

module.exports = router