"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define("Interacciones", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entrada: {
      type: DataTypes.STRING
    },
    categoria: DataTypes.STRING,
    subcategoria: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    formulario: {
      type: DataTypes.JSONB
    }
  });
}
