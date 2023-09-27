const express = require('express')
const { Router } = express
const router = new Router() 
const {checkAutentication} = require('../middlewares/authenticator.middlewares.js')

router.get('/premium/:uid', checkAutentication, (req, res) => {
 res.send('users premium')
})


module.exports = router