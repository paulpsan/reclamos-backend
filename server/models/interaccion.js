'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define("Interacciones", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoria: DataTypes.STRING,
    subcategoria: DataTypes.STRING,
    entrada: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["FACEBOOK", "LINEA_GRATUITA", "WHATSAPP", "CORREO","CHAT","TWITTER"]]
      }
    },
    descripcion: DataTypes.STRING,
  });
}
