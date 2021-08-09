 
module.exports = (sequelize, dataTypes) => {
    const alias = "Usuario"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
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
        }

    }
    const config = {

        tableName: "Usuario",
        timestamps: false

    };
    const Usuario = sequelize.define(alias, cols, config)
    
    return Usuario
}