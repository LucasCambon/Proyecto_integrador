const express = require("express")
const controladorUsers = require("./../controllers/usersController")
const router = express()

const usersController = require("./../controllers/usersController")



router.get("/registro",usersController.registro)
router.get("/ingreso",usersController.ingreso)
router.get("/perfil",usersController.perfil)


module.exports = router;