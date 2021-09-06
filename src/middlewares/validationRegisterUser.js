const path = require('path');
const { body } = require("express-validator");
const fs = require("fs");
module.exports = [
    body("nombres").notEmpty().withMessage("Tienes que ingresar un nombre"),
    body("apellidos").notEmpty().withMessage("Tienes que ingresar un apellido"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    body("correo").notEmpty().withMessage("Tienes que ingresar un email").isEmail().withMessage("Tienes que ingresar un email valido"),
    body("image").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]
        
        if (file == undefined){
            throw new Error("Adjunte una imagen con formato: " + acceptedExtensions + " y peso máximo 10mb.")
        }
        else if (file.size > 1024) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            })   
            throw new Error("Adjunte una imagen con formato: " + acceptedExtensions + " y peso máximo 10mb.")

        }  
        
        return true;
    })
]

