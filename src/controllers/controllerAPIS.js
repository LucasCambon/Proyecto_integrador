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
				let contadores = { total: 0, activos: 0, eliminados: 0, juegos: 0, items: 0, bundle: 0, coins: 0 ,merchandising: 0 }
				
				for (let i=0; i<productos.length; i++){
					console.log(productos[i].category)
					contadores.total += 1
					if (productos[i].eliminado == false){
						contadores.activos += 1
						let categoria = productos[i].category
						contadores[categoria] += 1
					}
					else {
						contadores.eliminados +=1
					}
                }
				return res.status(200).json({
					data: productos,
					totalCount: contadores.total,
					activeCount: contadores.activos,
					delCount: contadores.eliminados,
					juegosCount: contadores.juegos,
					itemsCount: contadores.items,
					bundleCount: contadores.bundle,
					coinsCount: contadores.coins,
					merchCount: contadores.merchandising,
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