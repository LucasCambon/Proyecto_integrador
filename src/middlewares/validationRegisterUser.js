const path = require('path');
const { body } = require("express-validator");
module.exports = [
    body("nombres").notEmpty().withMessage("Tienes que ingresar un nombre"),
    body("apellidos").notEmpty().withMessage("Tienes que ingresar un apellido"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    body("correo").notEmpty().withMessage("Tienes que ingresar un email")
]