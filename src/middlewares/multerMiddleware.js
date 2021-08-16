const path = require('path');
const multer = require("multer")
const { validationResult } = require("express-validator")

let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]

const fileFilter = function (req, file, cb){
    let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)){
            return cb(null, false);
        }
        else{
           return cb(null, true);
            
        }
        
} 

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,"../../public/img"));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ 
    fileFilter : fileFilter,
    storage: multerDiskStorage });

module.exports = uploadFile;