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
import { Reclamo } from "../../sqldb";
import { Usuario } from "../../sqldb";
import moment from "moment";
import "moment/locale/es-us";
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
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

// Gets a list of reclamos
export function index(req, res) {
  return Reclamo.findAll({ include: [{ model: Usuario, as: "Usuario" }] })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reclamo from the DB
export function show(req, res) {
  return Reclamo.find({
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
  console.log(req.body);
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
