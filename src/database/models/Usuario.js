module.exports = (sequelize, dataTypes) => {
    const alias = "Usuario"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        contrasenia:{
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(255),
            allowNull: false
        },
        administrador:{
            type: dataTypes.BOOLEAN,
        }

    }
    const config = {

        tableName: "Usuario",
        timestamps: false

    };
    const Usuario = sequelize.define(alias, cols, config)
    
    Usuario.associate = function (modelo) {

        Usuario.hasMany(modelo.Tarjeta, {
            as: "tarjetas",
            foreignKey: "id_tarjeta"
        })

        Usuario.hasMany(modelo.Factura, {
            as: "facturas",
            foreignKey: "id_cliente"
        })

    }

    return Usuario
}