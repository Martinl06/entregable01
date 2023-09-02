const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const passport = require('passport');
const { githubCallback } = require('../controllers/github.controllers');



router.get('/github', passport.authenticate('auth-Github', { scope: [ 'user:email' ], session: false }));


router.get('/githubcallback', passport.authenticate('auth-Github', { scope: [ 'user:email' ], session: false }), githubCallback);






module.exports = router