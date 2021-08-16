module.exports = (sequelize, dataTypes) => {
    const alias = "Tarjeta"
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titular: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        nro_tarjeta: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        cod_seguridad: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        vencimiento:{
            type: dataTypes.DATE,
            allowNull: false
        }
    }
    const config = {

        tableName: "Tarjeta",
        timestamps: false

    };
    const Tarjeta = sequelize.define(alias, cols, config)
    
    Tarjeta.associate = function (modelo) {

        Tarjeta.belongsTo(modelo.Usuario, {
            as: "usuarios",
            foreignKey: "id_tarjeta"
        })

    }

    return Tarjeta
}