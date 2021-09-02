const path = require('path');
const { body } = require("express-validator");
module.exports = [
    body("nombres").notEmpty().withMessage("Tienes que ingresar un nombre"),
    body("apellidos").notEmpty().withMessage("Tienes que ingresar un apellido"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    body("correo").notEmpty().withMessage("Tienes que ingresar un email").isEmail().withMessage("Tienes que ingresar un email valido"),
    body("image").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]
        
        if (!file){
            throw new Error("Tiene que adjuntar una imagen")
        }
        else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error("Extensión de imagen no valida")
            }
        }
        
        return true;
    })
]