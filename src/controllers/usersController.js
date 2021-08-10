const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
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
					image: req.file.filename
				})
				.catch((e) => {
					console.log(e)
				})
				res.redirect("./ingreso");
			}
		})
	},
    ingreso: (req, res) =>{
        res.render("./users/ingreso");
    },
	login: (req, res) => {

		db.Usuario.findOne({ where: { email: req.body.correo } }).then((usuario) => {
			if (usuario.email == req.body.correo) {

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
			res.send(usuario)
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
	}
}


module.exports = controladorUsers;