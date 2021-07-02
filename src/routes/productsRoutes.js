const express = require("express")
const path = require('path');
const multer = require("multer")
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,"../../public/img"));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });


const router = express.Router()

const productsController = require("../controllers/productsController")

router.get("/carrito",productsController.carrito)
router.get("/creacion_producto",productsController.creacion_producto)
router.post("/creacion_producto",uploadFile.single("image"),productsController.store)
router.get("/detalleDeProducto/:id",productsController.detalleDeProducto)
router.get('/edicion_producto/:id', productsController.edicion_productos); 
router.put('/edicion_producto/:id', productsController.update); 
router.get("/listado_productos",productsController.listado_productos);
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;