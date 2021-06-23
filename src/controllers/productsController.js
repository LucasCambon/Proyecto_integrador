const controladorProducts =
{
    carrito: (req, res) =>{
        res.render("./products/carrito");
    },
    creacion_producto: (req, res) =>{
        res.render("./products/creacion_producto");
    },
    detalleDeProducto: (req, res) =>{
        res.render("./products/detalleDeProducto");
    },
    edicion_productos: (req, res) =>{
        res.render("./products/edicion_producto");
    },
    listado_productos: (req, res) =>{
        res.render("./products/listado_productos");
    }
}

module.exports = controladorProducts;