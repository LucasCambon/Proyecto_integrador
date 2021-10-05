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
				let productosCont = { total: 0, activos: 0}
				let contadores = { juegos: 0, items: 0, bundle: 0, coins: 0 ,merchandising: 0 }
				let contCat = 0;
				let prodActivos = []
				let prodEliminados = []
				for (let i=0; i<productos.length; i++){
					productosCont.total += 1
					if (productos[i].eliminado == false){
						productosCont.activos += 1
						let categoria = productos[i].category
						contadores[categoria] += 1
						prodActivos.push(productos[i])
					}
					else{
						prodEliminados.push(productos[i])
					}
                }
				for (let categoria in contadores){
					contCat += 1
				}
				return res.status(200).json({
					data: prodActivos,
					eliminados: prodEliminados,
					totalCount: productosCont.total,
					activeCount: productosCont.activos,
					categorias: [
						{juegos: contadores.juegos},
						{items: contadores.items},
						{bundle: contadores.bundle},
						{coins: contadores.coins},
						{merch: contadores.merchandising}

					],
					categoryCount: contCat,
					status: 200
				})
			})
	},
    usuarioId: (req,res) => {
		db.Usuario.findByPk(req.params.id)
			.then(usuario => {
                usuario.contrasenia = undefined
				return res.status(200).json({
					data: usuario,
					status: 200
				})
			})
			.catch((e) => {
				console.log(e)
			})
	},
	todosUsuarios: (req,res) => {
		db.Usuario.findAll()
			.then(usuarios => {
				let contador = 0;
                for (let i=0; i<usuarios.length; i++){
                    usuarios[i].contrasenia = undefined
					contador += 1
                }
				return res.status(200).json({
					data: usuarios,
					count: contador,
					status: 200
				})
			})
	},
	facturas: (req,res) => {
		db.Factura.findAll()
			.then(facturas => {
				let contador = 0;
                for (let i=0; i<facturas.length; i++){
					contador += 1
                }
				return res.status(200).json({
					data: facturas,
					count: contador,
					status: 200
				})
			})
	},
	prodFactura: (req,res) => {
		db.Producto_factura.findAll()
			.then(prod => {
				let contador = 0;
                for (let i=0; i<prod.length; i++){
					contador += 1
                }
				return res.status(200).json({
					data: prod,
					count: contador,
					status: 200
				})
			})
	}
}

module.exports = controladorAPIS;