const controladorProducts =
{
    carrito: (req, res) =>{
        res.render("./products/carrito");
    },
    creacion_productos: (req, res) =>{
<<<<<<< HEAD
        res.render("./products/creacion_productos");
=======
        res.render("./products/creacion_producto");
>>>>>>> EstebanGonzalez
    },
    detalleDeProducto: (req, res) =>{
        res.render("./products/detalleDeProducto");
    },
    edicion_productos: (req, res) =>{
<<<<<<< HEAD
        res.render("./products/edicion_productos");
=======
        res.render("./products/edicion_producto");
>>>>>>> EstebanGonzalez
    },
    listado_productos: (req, res) =>{
        res.render("./products/listado_productos");
    }
}

module.exports = controladorProducts;