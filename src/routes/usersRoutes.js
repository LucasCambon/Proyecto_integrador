const express = require("express")
const router = express()

const usersController = require("./../controllers/usersController")

const validations = require("../middlewares/validationRegisterUser")

router.get("/registro",usersController.registro)
router.post("/registro",validations,usersController.store)
router.get("/ingreso",usersController.ingreso)
router.get("/perfil",usersController.perfil)


module.exports = router;