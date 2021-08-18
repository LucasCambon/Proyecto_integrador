module.exports = (sequelize, dataTypes) => {
    const alias = "Factura"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_factura:{
            type: dataTypes.DATE,
            allowNull: false
        },
        total:{
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        }
    }
    const config = {

        tableName: "Factura",
        timestamps: false

    };
    const Factura = sequelize.define(alias, cols, config)
    
    Factura.associate = function (modelo) {

        Factura.belongsTo(modelo.Usuario, {
            as: "usuarios",
            foreignKey: "id_cliente"
        })

        Factura.belongsToMany(modelo.Producto, {
            as: "productos",
            through: "Producto_factura",
            foreignKey: "id_factura",
            otherKey: "id_producto",
            timestamps: false
        })

    }

    return Factura
}