const db = require("../database/models")
const { validationResult } = require("express-validator");
const multer = require("multer");
const mercadopago = require("mercadopago");
const { push } = require("../middlewares/validationProductRegister");
const nodemailer = require("nodemailer");


mercadopago.configure({
	access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
})

const controladorProducts =
{
    carrito: (req, res) => {
        res.render("./products/carrito");
    },
	pagar: (req, res) => {
		res.send("Pago completado")
	},
    creacion_producto: (req, res) =>{
        res.render("./products/creacion_producto");
    },

    store: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length>0) {
			res.render("./products/creacion_producto",{
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		else {
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
		}
		
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
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length>0) {
			res.render("./products/edicion_producto",{producto: db.Producto.findOne({ where: { id: req.params.id } }).then((producto) => {
				return producto
				
			}),
			errors: resultValidation.mapped(),
			oldData: req.body
				
			})
		}
		else {
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
			res.redirect("/")
		}
		
	
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
				return res.redirect("/")
			})
			
	},
	facturacion: (req, res) => {

		db.Factura.create({
			fecha_factura: Date.now(),
			total: req.body.price,
			id_cliente: req.body.idUsuario
		})
		.catch((e) => {
			console.log(e)
		})

		let prodCarrito = []
		let carritoComplet = JSON.parse(req.body.listadoCarrito)
		console.log(carritoComplet[0].name)
		for (producto in carritoComplet){
			prodCarrito.push({
				title: carritoComplet[producto].name,
				unit_price: parseInt(carritoComplet[producto].price),
				quantity: parseInt(carritoComplet[producto].cantidad),
			})
		}
		


		let preference = {
			items: prodCarrito,
			back_urls: {
			  success: "http://localhost:3001/",
			  failure: "http://localhost:3001/products/carrito",
			  pending: "http://localhost:3001/products/carrito"
			}
		  };
		mercadopago.preferences.create(preference)
		.then(function (response) {
			
			res.redirect(response.body.init_point);
		
		}).catch(function (error) {
			console.log(error);
		});
	}
}

module.exports = controladorProducts;