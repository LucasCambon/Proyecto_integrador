const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require("express-validator")
const bcryptjs = require('bcryptjs');

const controladorUsers  =
{
    perfil: (req, res) => {
        res.render("./users/perfil", {usuarios:users});
    },
    registro: (req, res) =>{
        res.render("./users/registro");
    },
    store: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length>0) {
			res.render("./users/registro",{
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		for (let i=0; i<users.length;i++){
			if (users[i].email === req.body.correo)
			return res.render("./users/registro",{
				errors: {
					correo: {
						msg: "Email ya registrado"
					}
				},
				oldData: req.body
			})
			else{
				let obj = {
					id: users.length + 1,
					nombre: req.body.nombres,
					apellido: req.body.apellidos,
					email: req.body.correo,
					contraseña: bcryptjs.hashSync(req.body.contraseña,10),
				}
				
				users.push(obj)
				fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
					if (err) {
						console.log('Error writing file', err)
					} 
					else {
						console.log('Successfully wrote file')
					}
				})
				console.log(obj)
				res.redirect("/")
			}
		}
	},
    ingreso: (req, res) =>{
        res.render("./users/ingreso");
    },
<<<<<<< HEAD
=======
	login: (req, res) => {

		users.forEach(function(usuario){
			if (usuario.email == req.body.correo){
				let passOk = usuario.contraseña
				if (passOk){
					res.send(passOk)
				}

				}
			else{
				return res.render("./users/ingreso", 
				{
					errors:{
						correo:{
							msg:"Datos invalidos"
						}
					}
				})
			}
			})
	}
>>>>>>> Lucas
}


module.exports = controladorUsers;