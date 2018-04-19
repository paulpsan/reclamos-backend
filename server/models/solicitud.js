'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define("Solicitudes", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNulll: false
    },
    descripcion: {
      type: DataTypes.STRING(2000),
      allowNulll: false
    },
    prioridad: {
      type: DataTypes.INTEGER
    }
  });
}
