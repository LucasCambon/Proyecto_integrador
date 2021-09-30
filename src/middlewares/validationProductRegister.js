const path = require('path');
const fs = require("fs");
const { body } = require("express-validator");
module.exports = [
    body("name").notEmpty().withMessage("El nombre del producto debe tener entre 5 y 40 caracteres. No puede contener caracteres especiales o números.").isLength({min:5, max:40}).withMessage("El nombre del producto debe tener entre 5 y 40 caracteres. No puede contener caracteres especiales o números."),
    body("price").notEmpty().withMessage("Tienes que ingresar el precio del producto").isFloat({min:0.01, max:999999.99}).withMessage("Precio invalido, el valor debe ser númerico entre 0.01 - 999999.99"),
    body("description").notEmpty().withMessage("Tienes que agregar la descripción del producto").isLength({min:20, max:200}).withMessage("La descripción debe tener entre 20 y 200 caracteres"),
    body("category").notEmpty().withMessage("Tienes que elegir la categoría del producto"),
    body("image").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]
        
        if (file == undefined){
            throw new Error("Adjunte una imagen con formato: " + acceptedExtensions + " y peso máximo 10mb.")
        }
        else if (file.size > (1024 * 1024 * 10)) {
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
