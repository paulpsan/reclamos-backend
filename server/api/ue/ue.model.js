'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define("Ue", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    des_ue: DataTypes.STRING,
    des_org_curr: DataTypes.STRING,
    des_dependencia: DataTypes.STRING,
    des_localidad: DataTypes.STRING,
    des_canton: DataTypes.STRING,
    des_seccion: DataTypes.STRING,
    des_provincia: DataTypes.STRING,
    des_departamento: DataTypes.STRING,
    des_nucleo: DataTypes.STRING,
    direccion: DataTypes.STRING,
    zona: DataTypes.STRING,
    cod_distrito: DataTypes.STRING,
    des_distrito: DataTypes.STRING,
    des_niveles: DataTypes.STRING
  });
}
