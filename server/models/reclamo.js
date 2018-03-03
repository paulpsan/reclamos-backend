'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define("Reclamo", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    unidad_educativa: DataTypes.STRING,
    departamento: DataTypes.STRING,
    distrito: DataTypes.STRING,
    dir_detallada: DataTypes.STRING,
    nombre_estudiante: DataTypes.STRING,
    detalle_reclamo: DataTypes.STRING,
    recive_informacion: DataTypes.STRING,
    nombre_denunciante: DataTypes.STRING,
    telefono_denunciante: DataTypes.STRING,
    fecha_reclamo: DataTypes.STRING,
    fecha_modificacion: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    usuario_accion:DataTypes.STRING,
    canal: DataTypes.STRING,
    estado: DataTypes.STRING,
  });
}
