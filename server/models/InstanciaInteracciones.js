"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define("InstanciaInteracciones", {
    formulario: DataTypes.JSONB
  });
}
