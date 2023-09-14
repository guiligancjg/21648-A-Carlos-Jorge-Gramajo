const { DataTypes, Sequelize, sequelize } = require('../conexion_mysql');

                             /* nombre de la base de datos "posts" */
const posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    
    detalle: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    url_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },

    visitas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    post_eliminados: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    createdAt: true,
    updatedAt: true
})

module.exports = posts;