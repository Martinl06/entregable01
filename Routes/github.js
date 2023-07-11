const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();
const passport = require('passport');



router.get('/github', passport.authenticate('auth-Github', { scope: [ 'user:email' ], session: false }));




router.get('/githubcallback', passport.authenticate('auth-Github', { scope: [ 'user:email' ], session: false }),(req, res) => {
    req.session.user = req.user;
    // Successful authentication, redirect perfilView.
    res.redirect('/api/sessions/perfilView');
  });






module.exports = router