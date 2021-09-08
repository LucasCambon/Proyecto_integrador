 
module.exports = (sequelize, dataTypes) => {
    const alias = "Producto"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        description:{
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(255),
            allowNull: false
        },
        eliminado:{
            type: dataTypes.BOOLEAN,
        }

    }
    const config = {

        tableName: "Producto",
        timestamps: false

    };
    const Producto = sequelize.define(alias, cols, config)
    
    Producto.associate = function(modelo) {

        Producto.belongsToMany(modelo.Factura, {
            as: "facturas",
            through: "Producto_factura",
            foreignKey: "id_producto",
            otherKey: "id_factura",
            timestamps: false
        })
    }

    return Producto
}
