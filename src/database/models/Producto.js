 
module.exports = (sequelize, dataTypes) => {
    const alias = "Producto"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER(10).UNSIGNED,
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
        }

    }
    const config = {

        tableName: "Producto",
        timestamps: false

    };
    const Producto = sequelize.define(alias, cols, config)
    
    return Producto
}
