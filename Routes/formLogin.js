const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const filestore = require('session-file-store');
const session = require ('express-session');
const MongoStore = require('connect-mongo');
const User = require('../dao/models/modelUser.js')



router.use(express.json())
/*app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://martinlujan0666:Martin1470@ecommerce.v4lpkit.mongodb.net/ecommerce'
    }),
    secret: 'secretCode',
    resave: true,
    saveUninitialized: false,
}))*/

router.get('/sessionCreate', (req, res) => {
    req.session.name = 'martin'
    req.session.age = 22
    res.send("session created")
    
    
})

router.get('/sessionGet', (req, res) => {
    res.send(req.session)
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) res.status(200).send("logout success")
        else res.status(500).send({err})
    })
})



module.exports = router