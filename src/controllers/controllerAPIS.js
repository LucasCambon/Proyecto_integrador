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
			.then(productos => {
				let contador = 0;
				for (let i=0; i<productos.length; i++){
					contador += 1
                }
				return res.status(200).json({
					data: productos,
					count: contador,
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
				let contador = 0;
                for (let i=0; i<usuarios.length; i++){
                    usuarios[i].contrasenia = ""
					contador += 1
                }
				return res.status(200).json({
					data: usuarios,
					count: contador,
					status: 200
				})
			})
	}
}

module.exports = controladorAPIS;