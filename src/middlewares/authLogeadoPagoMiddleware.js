function authMiddleware (req, res, next){
    if(!req.session.userLogged){
        return res.send("Debes logearte para continuar con el pago")
    }
    next()
}

module.exports = authMiddleware