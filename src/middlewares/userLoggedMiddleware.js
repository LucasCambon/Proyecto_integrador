const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware ( req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if (req.session.userLogged){
        if (emailInCookie) {
            users.forEach(function(usuario){
                if (usuario.email == emailInCookie){
                        delete usuario.contraseña;
                        req.session.userLogged = usuario;
                        res.locals.isLogged = true;
                        res.locals.userLogged = req.session.userLogged;
                    }
                })
            }
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    

    next()
}

module.exports = userLoggedMiddleware;