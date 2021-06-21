const productsObj = {
    nombre: ["Nombre 1", "Nombre 2", "Nombre 3", "Nombre 4", "Nombre 5", "Nombre 6"],
    precio: ["$ 1", "$ 2", "$ 3", "$ 4", "$ 5", "$ 6"],
    img: ["../public/img/imagen de producto prueba.png","../public/img/imagen de producto prueba.png","../public/img/imagen de producto prueba.png","../public/img/imagen de producto prueba.png","../public/img/imagen de producto prueba.png","../public/img/imagen de producto prueba.png"],
    id: [0,1,2,3,4,5]
}

const controlador =
{
    index: (req, res) => {
        res.render("index",{nombre:productsObj.nombre,
            precio:productsObj.precio,
            img:productsObj.img,
            id:productsObj.id
            });
    }
}

module.exports = controlador;