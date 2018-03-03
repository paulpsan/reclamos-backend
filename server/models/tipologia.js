"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define("Tipologias", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING(1000)
    }
  });
}
