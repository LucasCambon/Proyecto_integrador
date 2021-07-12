const express = require("express")
const multer = require("multer")


const router = express()


const usersController = require("./../controllers/usersController")



router.get("/registro",usersController.registro)
router.post("/registro",usersController.store)
router.get("/ingreso",usersController.ingreso)
router.get("/perfil",usersController.perfil)


module.exports = router;