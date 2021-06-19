const express = require("express")

const controladorProducts = require("./../controllers/productsController")

const router = express()

const productsController = require("./../controllers/productsController")

router.get("/carrito",productsController.carrito)
router.get("/creacion_productos",productsController.creacion_productos)
router.get("/detalleDeProducto",productsController.detalleDeProducto)
router.get("/edicion_producto",productsController.edicion_productos)
router.get("/listado_productos",productsController.listado_productos)

module.exports = router;