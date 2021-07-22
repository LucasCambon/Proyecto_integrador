const express = require("express")
const router = express()

const usersController = require("./../controllers/usersController")

const validations = require("../middlewares/validationRegisterUser")

/*** REGISTRO ***/
router.get("/registro",usersController.registro)
router.post("/registro",validations,usersController.store)

/*** INGRESO ***/
router.get("/ingreso",usersController.ingreso)
router.post("/ingreso",usersController.login)


/*** PERFIL***/
router.get("/perfil",usersController.profile)


module.exports = router;