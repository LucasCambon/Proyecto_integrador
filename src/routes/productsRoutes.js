const express = require("express")



const router = express.Router()

const productsController = require("../controllers/productsController")

const uploadFile = require("../middlewares/multerMiddleware")

/*** CARRITO ***/
router.get("/carrito",productsController.carrito)

/*** CREAR PRODUCTO ***/
router.get("/creacion_producto",productsController.creacion_producto)
router.post("/creacion_producto",uploadFile.single("image"),productsController.store)


router.get("/detalleDeProducto/:id",productsController.detalleDeProducto)

/*** EDITAR PRODUCTO ***/
router.get('/edicion_producto/:id',productsController.edicion_productos); 
router.put('/edicion_producto/:id',productsController.update); 

/*** LISTADO DE PRODUCTOS ***/
router.get("/listado_productos",productsController.listado_productos);
router.get("/listado_bundles",productsController.listado_bundles);
router.get("/listado_coins",productsController.listado_coins);
router.get("/listado_items",productsController.listado_items);
router.get("/listado_juegos",productsController.listado_juegos);
router.get("/listado_merchandising",productsController.listado_merchandising);


/*** ELIMINAR PRODUCTO ***/
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;