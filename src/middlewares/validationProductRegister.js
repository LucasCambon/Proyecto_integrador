const path = require('path');
const fs = require("fs");
const { body } = require("express-validator");
module.exports = [
    body("name").notEmpty().withMessage("Tienes que ingresar el nombre del producto"),
    body("price").notEmpty().withMessage("Tienes que ingresar el precio del producto"),
    body("description").notEmpty().withMessage("Tienes que agregar la descripción del producto"),
    body("category").notEmpty().withMessage("Tienes que elegir la categoría del producto"),
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
