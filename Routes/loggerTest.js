const express = require('express')
const { Router } = express
const router = new Router()
const {addLogger} = require('../loggers/custom.loggers.js')

//Middleware
router.use(addLogger)


router.get('/', (req, res) => {
    req.logger.info('Prueba info')
    res.send('Prueba info logger')
})




module.exports = router