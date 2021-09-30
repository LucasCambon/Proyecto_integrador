const { validationResult } = require("express-validator")
const bcryptjs = require('bcryptjs');

const db = require("../database/models")

const controladorUsers  =
{

    registro: (req, res) =>{
		res.render("./users/registro");
    },
    store: (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length>0) {
			return res.render("./users/registro",{
				errors: resultValidation.mapped(),
				oldData: req.body
				
			});		
		}

		db.Usuario.findOne({ where: { email: req.body.correo } }).then((usuario) => {
			if (usuario) {
				return res.render("./users/registro",{
					errors: {
						correo: {
							msg: "Email ya registrado"
						}
					},
					oldData: req.body
				})
			}
			else {
				db.Usuario.create({
					nombre: req.body.nombres,
					apellido: req.body.apellidos,
					email: req.body.correo,
					contrasenia: bcryptjs.hashSync(req.body.contraseña,10),
					image: req.file.filename,
					administador: 0
				})
				.then(() => {
					res.redirect("./ingreso");
				})
				.catch((e) => {
					console.log(e)
				})
				
			}
		})
	},
    ingreso: (req, res) =>{
        res.render("./users/ingreso");
    },
	login: (req, res) => {

		db.Usuario.findOne({ where: { email: req.body.correo } }).then((usuario) => {
			if (usuario) {

				let passOk = bcryptjs.compareSync(req.body.contraseña, usuario.contrasenia)
				if (passOk){
					delete usuario.contrasenia;
					req.session.userLogged = usuario;

					if (req.body.recordarUsuario) {
						res.cookie("userEmail", req.body.correo, { maxAge: (1000 * 60) * 60})
					}

					res.redirect("/users/perfil")
				}
				else{
					return res.render("./users/ingreso", 
					{
						errors:{
							datosMal:{
								msg:"Las credenciales son invalidas."
							}
						}
					})
				}
				
			}
			else {
				return res.render("./users/ingreso", 
					{
						errors:{
							datosMal:{
								msg:"Las credenciales son invalidas."
							}
						}
					})
			}
		})
		.catch((e) => {
			console.log(e)
		})
	},
	profile: (req, res) => {
		res.render("./users/perfil",{
			user: req.session.userLogged
		})
	},
	logout: (req, res) => {
		res.clearCookie("userEmail")
		req.session.destroy();
		return res.redirect("/")
	},

	borrarUsuario: (req, res) => {
		db.Usuario.destroy({ 
			where: { 
				id: req.params.id
			}
		})
		return res.redirect("/")
	},
	adminUsuario: (req, res) => {

		db.Usuario.update({
			administrador: 1
		},
		{
			where: {id: req.params.id}
		}).then(() => {
			return res.redirect("/")
		})
		
}
}


module.exports = controladorUsers;