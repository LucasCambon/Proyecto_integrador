const express = require("express")
const router = express()
const usersController = require("./../controllers/usersController");
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validationRegisterUser");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddlewares");


/*** REGISTRO ***/
router.get("/registro", guestMiddleware,usersController.registro)
router.post("/registro", uploadFile.single("image"), validations,usersController.store)


/*** INGRESO ***/
router.get("/ingreso", guestMiddleware,usersController.ingreso)
router.post("/ingreso",usersController.login)


/*** PERFIL***/
router.get("/perfil", authMiddleware,usersController.profile)

router.get("/logout", usersController.logout);


module.exports = router;

/*const deleteFile = (req,file) => {
    let rutaArchivo = "../../public/img" + req.file.filename
    fs.unlink(rutaArchivo, (err) => {
        if (err) throw err;
    })
}*/