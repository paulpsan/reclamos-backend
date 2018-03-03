'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define("Usuario", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["ADMIN", "AGENTE", "SUPERVISOR", "REPORTES"]]
      }
    },
    nombres: DataTypes.STRING,
    apaterno: DataTypes.STRING,
    amaterno: DataTypes.STRING,
    fecha_nacimiento: DataTypes.STRING,
    genero: DataTypes.STRING
  });
}
