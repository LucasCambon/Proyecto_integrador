const db = require("../database/models")

const controladorProducts =
{
    carrito: (req, res) => {
        res.render("./products/carrito");
    },
    creacion_producto: (req, res) =>{
        res.render("./products/creacion_producto");
    },

    store: (req, res) => {

		db.Producto.create({
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename,
			eliminado: 0
		})
		.catch((e) => {
			console.log(e)
		})
		res.redirect("/")
	},

    detalleDeProducto: (req, res) =>{

		db.Producto.findOne({ where: { id: req.params.id } }).then((producto) => {
			if (producto) {
				return res.render("./products/detalleDeProducto",{
					producto: producto
				})
			}
		})
		.catch((e) => {
			console.log(e)
		})
    },
    edicion_productos: (req, res) => {

		db.Producto.findOne({ where: { id: req.params.id } }).then((producto) => {
			if (producto) {
				return res.render("./products/edicion_producto",{
					producto: producto
				})
			}
		})
		.catch((e) => {
			console.log(e)
		})
	},
	update: (req, res) => {

		db.Producto.update({
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description
		},
		{
			where: {id: req.params.id}
		})
		.catch((e) => {
			console.log(e)
		})
		res.render("./products/mensaje-edicion")
	
	},

    listado_productos: (req, res) =>{
		db.Producto.findAll({
			where: {eliminado: 0}
		})
			.then(function(productos){
				return res.render("./products/listado_productos",{productos:productos
				});
			})
    },

	listado_bundles: (req, res) =>{
		db.Producto.findAll({
			where: {
				category: "Bundle",
				eliminado: 0
			}
		})
			.then(function(productos){
				return res.render("./products/listado_bundles",{productos:productos
				});
			})
    },
	listado_coins: (req, res) =>{
		db.Producto.findAll({
			where: {
				category: "Coins",
				eliminado: 0
			}
		})
			.then(function(productos){
				return res.render("./products/listado_coins",{productos:productos
				});
			})
    },
	listado_items: (req, res) =>{
		db.Producto.findAll({
			where: {
				category: "Items",
				eliminado: 0
			}
		})
			.then(function(productos){
				return res.render("./products/listado_items",{productos:productos
				});
			})
    },
	listado_juegos: (req, res) =>{
		db.Producto.findAll({
			where: {
				category: "Juegos",
				eliminado: 0
			}
		})
			.then(function(productos){
				return res.render("./products/listado_juegos",{productos:productos
				});
			})
    },
	listado_merchandising: (req, res) =>{
		db.Producto.findAll({
			where: {
				category: "Merchandising",
				eliminado: 0
			}
		})
			.then(function(productos){
				return res.render("./products/listado_merchandising",{productos:productos
				});
			})
    },
	destroy : (req, res) => {

			db.Producto.update({
				eliminado: 1
			},
			{
				where: {id: req.params.id}
			}).then(() => {
				return res.render("./products/mensaje-borrado")
			})
			
	}
}

module.exports = controladorProducts;