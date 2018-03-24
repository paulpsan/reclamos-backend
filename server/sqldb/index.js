"user strict";
import Sequelize from "sequelize";
import config from "../config/environment";

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};
db.Solicitud = db.sequelize.import("../models/solicitud");
db.Tipologia = db.sequelize.import("../models/tipologia");

db.Usuario = db.sequelize.import("../models/usuario");
db.Thing = db.sequelize.import("../models/thing");
db.Reclamo = db.sequelize.import("../models/reclamo");
db.Ue = db.sequelize.import("../models/ue");

db.Instancia = db.sequelize.import("../models/instancia");
db.Interaccion = db.sequelize.import("../models/interaccion");
db.InstanciaInteraccion = db.sequelize.import(
  "../models/InstanciaInteracciones"
);

//aqui agregamos inclusiones
/**
 * variable que ayuda con las inclusiones
 * se deben agregar las inclusiones con sus respectivos modelos al nombre de la inclusion
 * esto se usa para los query strings
 */
db.Reclamo.belongsTo(db.Usuario, {
  foreignKey: {
    name: "fk_usuario",
    allowNull: false
  },
  as: "Usuario"
});

db.Solicitud.belongsTo(db.Tipologia, {
  foreignKey: {
    name: "fk_tipologia",
    allowNull: false
  },
  as: "Tipologia"
});

db.Instancia.belongsToMany(db.Interaccion, {
  through: "InstanciaInteracciones",
  foreignKey: "fk_instancia"
});
db.Interaccion.belongsToMany(db.Instancia, {
  through: "InstanciaInteracciones",
  foreignKey: "fk_interaccion"
});

module.exports = db;
