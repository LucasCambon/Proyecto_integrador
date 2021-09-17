const db = require("../database/models")

const controladorAPIS =
{
    productoId: (req,res) => {
		db.Producto.findByPk(req.params.id)
			.then(producto => {
				return res.status(200).json({
					data: producto,
					status: 200
				})
			})
	},
	todosProductos: (req,res) => {
		db.Producto.findAll()
			.then(producto => {
				return res.status(200).json({
					data: producto,
					status: 200
				})
			})
	},
    usuarioId: (req,res) => {
		db.Usuario.findByPk(req.params.id)
			.then(usuario => {
                usuario.contrasenia = ""
				return res.status(200).json({
					data: usuario,
					status: 200
				})
			})
	},
	todosUsuarios: (req,res) => {
		db.Usuario.findAll()
			.then(usuarios => {
                for (let i=0; i<usuarios.length; i++){
                    usuarios[i].contrasenia = ""
                }
				return res.status(200).json({
					data: usuarios,
					status: 200
				})
			})
	}
}

module.exports = controladorAPIS;