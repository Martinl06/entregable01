const passport = require('passport');



function githubCallback(req, res){
        req.session.user = req.user;
        // Successful authentication, redirect perfilView.
        res.redirect('/api/sessions/perfil');
}


module.exports = {
    githubCallback,
}
