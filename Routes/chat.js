const express = require('express')
const { Router } = express
const router = new Router()
const MessageController = require('../controllers/chat.controllers')


function checkAutentication (req, res, next) { 
    if(req.session.user) {
        next()
    } else {
        res.redirect('/api/sessions/login')
    }
}




router.get('/', checkAutentication, MessageController.getAllMessages )

router.post('/', MessageController.addMessage )

module.exports = router