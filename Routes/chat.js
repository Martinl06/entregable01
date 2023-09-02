const express = require('express')
const { Router } = express
const router = new Router()
const MessageController = require('../controllers/chat.controllers')
const {checkAutentication, UserOk} = require('../middlewares/authenticator.middlewares.js')






router.get('/', checkAutentication, UserOk, MessageController.getAllMessages )

router.post('/', checkAutentication, UserOk ,MessageController.addMessage )

module.exports = router