const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const categoriasFilePath = path.join(__dirname, '../data/categoriasProdDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, 'utf-8'));

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
			description: req.body.description,
			image: req.file.filename
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
		db.Producto.findAll()
			.then(function(productos){
				return res.render("./products/listado_productos",{productos:productos,categorias:categorias
				});
			})
    },

	listado_bundles: (req, res) =>{
        res.render("./products/listado_bundles",{productos:products,categorias:categorias
		});
    },
	listado_coins: (req, res) =>{
        res.render("./products/listado_coins",{productos:products,categorias:categorias
		});
    },
	listado_items: (req, res) =>{
        res.render("./products/listado_items",{productos:products,categorias:categorias
		});
    },
	listado_juegos: (req, res) =>{
        res.render("./products/listado_juegos",{productos:products,categorias:categorias
		});
    },
	listado_merchandising: (req, res) =>{
        res.render("./products/listado_merchandising",{productos:products,categorias:categorias
		});
    },
	destroy : (req, res) => {
		let productosN = products.filter(producto => {
			return producto.id != req.params.id;
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(productosN, null, 2));
		res.render("./products/mensaje-borrado")
	}
}

module.exports = controladorProducts;