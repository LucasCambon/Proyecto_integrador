const controladorProducts =
{
    carrito: (req, res) =>{
        res.render("./products/carrito");
    },
    creacion_productos: (req, res) =>{
        res.render("./products/creacion_productos");
    },
    detalleDeProducto: (req, res) =>{
        res.render("./products/detalleDeProducto");
    },
    edicion_productos: (req, res) =>{
        res.render("./products/edicion_productos");
    },
    listado_productos: (req, res) =>{
        res.render("./products/listado_productos");
    }
}

module.exports = controladorProducts;