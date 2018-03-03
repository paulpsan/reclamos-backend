'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Reserva', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nro: DataTypes.INTEGER,
    fecha_confirmada: DataTypes.DATE,
    estado: DataTypes.STRING
  });
}
