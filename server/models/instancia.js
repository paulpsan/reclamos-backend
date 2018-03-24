"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define("Instancias", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entrada: DataTypes.STRING
  });
}
