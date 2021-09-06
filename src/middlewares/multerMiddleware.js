const path = require('path');
const multer = require("multer")
const { validationResult } = require("express-validator")


const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,"../../public/img"));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes("jpeg") || (file.mimetype).includes("png") || (file.mimetype).includes("jpg")) {
        console.log(file)
        cb(null, true);
    }
    else {
        console.log(file)
        cb(null, false)
        req.fileError = "ppp";
    }
}

const uploadFile = multer({ 
    fileFilter : fileFilter,
    storage: multerDiskStorage});



module.exports = uploadFile;