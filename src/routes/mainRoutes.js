const express = require("express")
const controlador = require("./../controllers/mainController")
const router = express()

const mainController = require("./../controllers/mainController")

router.get("/",mainController.index)


module.exports = router;