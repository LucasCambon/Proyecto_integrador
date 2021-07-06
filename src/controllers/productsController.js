const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
const categoriasFilePath = path.join(__dirname, '../database/categoriasProdDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, 'utf-8'));

const controladorProducts =
{
    carrito: (req, res) =>{
        res.render("./products/carrito");
    },
    creacion_producto: (req, res) =>{
        res.render("./products/creacion_producto");
    },

    store: (req, res) => {
		let obj = {
			id: products.length + 1,
			name: req.body.name,
			price: req.body.price,
			discount: 0,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		   }
           
		products.push(obj)
		fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), err => {
			if (err) {
				console.log('Error writing file', err)
			} 
			else {
				console.log('Successfully wrote file')
			}
		})
		console.log(obj)
		res.redirect("/")
	},

    detalleDeProducto: (req, res) =>{
		for (let i=0; i<products.length;i++){
			if (products[i].id == req.params.id)
			res.render("./products/detalleDeProducto", {producto:products[i]});
		}
        
    },
    edicion_productos: (req, res) => {
		for (let i=0; i<products.length;i++){
			if (products[i].id == req.params.id)
			var algo = products[i].id
		}
		res.render("./products/edicion_producto", {producto:algo})
	},
	update: (req, res) => {
		let obj = []
		products.forEach(function(producto){
			if (producto.id == req.params.id){
				producto = {
					id: producto.id,
					name: req.body.name,
					price: req.body.price,
					discount: req.body.discount,
					category: req.body.category,
					description: req.body.description,
					image : producto.image
					}
				obj.push(producto)
				}
			else{
				obj.push(producto)
			}
			})
		fs.writeFileSync(productsFilePath, JSON.stringify(obj, null, 2));
		res.render("./products/mensaje-edicion")
	
	},

    listado_productos: (req, res) =>{
        res.render("./products/listado_productos",{productos:products,categorias:categorias
		});
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