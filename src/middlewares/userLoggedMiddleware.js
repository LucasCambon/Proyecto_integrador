const db = require("../database/models")

function userLoggedMiddleware ( req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if (req.session.userLogged){
        if (emailInCookie) {
            db.Usuario.findOne({ where: {email: emailInCookie} }).then((usuario) => {
                if (usuario.email == emailInCookie){
                    delete usuario.contraseña;
                    req.session.userLogged = usuario;
                    res.locals.isLogged = true;
                    res.locals.userLogged = req.session.userLogged;
                }
            })
            .catch((e) => {
                console.log(e)
            })
        }
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    

    next()
}

module.exports = userLoggedMiddleware;