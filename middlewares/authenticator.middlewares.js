//midleware para verificar si el usuario esta logueado
function checkAutentication (req, res, next) { 
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/api/sessions/login')
}

function isUser(req, res, next) {
    if (req.session?.user?.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'error de autenticacion!' });
  }

  function UserOk (req, res, next) {
    if (req.session?.user?.email !== 'adminCoder@coder.com'){
         next()
    } else {
         res.status(401).send({message: 'Only User can access this route'});
    }
}

function isAdmin(req, res, next) {
    if (req.session?.user?.email === 'adminCoder@coder.com') {
      return next();
    }else{
      return res.status(401).send({message: 'No tiene permisos para acceder a esta ruta'});
    }
  }

  



module.exports = {checkAutentication, isUser, UserOk, isAdmin}