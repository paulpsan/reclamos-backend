/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reclamos              ->  index
 * POST    /api/reclamos              ->  create
 * GET     /api/reclamos/:id          ->  show
 * PUT     /api/reclamos/:id          ->  update
 * DELETE  /api/reclamos/:id          ->  destroy
 */

"use strict";

import _ from "lodash";
import { Reclamo } from "../sqldb";
import { Usuario } from "../sqldb";
import { Ue } from "../sqldb";
import moment from "moment";
import "moment/locale/es-us";
import { Sequelize } from "sequelize";
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    console.log("res:", entity);
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates).then(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy().then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}
export function graficas(req, res) {
  let departamento = req.params.id.toUpperCase();

  return Reclamo.findAll({
    attributes: [
      "distrito",
      "departamento",
      [Sequelize.fn("COUNT", Sequelize.col("distrito")), "cont"]
    ],
    where: {
      departamento: departamento
    },
    group: ["distrito", "departamento"]
  }).then(result => {
    res.send(result);
  });
}

// Gets a list of reclamos
export function index(req, res) {
  return Reclamo.findAll({
    include: [{ model: Usuario, as: "Usuario" }],
    order: [["_id", "desc"]]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reclamo from the DB
export function show(req, res) {
  return Reclamo.find({
    include: [{ model: Usuario, as: "Usuario" }],
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Reclamo in the DB
export function create(req, res) {
  req.body.fecha_reclamo = moment().format();
  req.body.fecha_modificacion = "";
  return Reclamo.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Reclamo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.fecha_modificacion = moment().format();
  return Reclamo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reclamo from the DB
export function destroy(req, res) {
  return Reclamo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function reporte(req, res) {
  const Op = Sequelize.Op;
  let desde = new Date(req.body.desde);
  let hasta = new Date(req.body.hasta);
  hasta.setHours(43, 59, 59, 0);
  return Reclamo.findAll({
    include: [{ model: Usuario, as: "Usuario" }],
    where: {
      createdAt: {
        [Op.between]: [desde, hasta]
      }
    }
  })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(handleError(res));
}