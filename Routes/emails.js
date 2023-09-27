const express = require('express')
const router = express.Router()

const { sendEmail } = require('../utils/nodemailer')

router.get('/', sendEmail)



module.exports = router