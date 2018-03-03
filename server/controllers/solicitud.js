/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reservas              ->  index
 * POST    /api/reservas              ->  create
 * GET     /api/reservas/:id          ->  show
 * PUT     /api/reservas/:id          ->  update
 * DELETE  /api/reservas/:id          ->  destroy
 */

"use strict";

import _ from "lodash";
import { Solicitud } from "../sqldb";
import { Tipologia } from "../sqldb";
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

// Gets a list of Tipologias
export function index(req, res) {
  return Solicitud.findAll({
    include: [{ model: Tipologia, as: "Tipologia" }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Solicitud from the DB
export function show(req, res) {
  return Solicitud.find({
    include: [{ model: Tipologia, as: "Tipologia" }],
    where: {
      _id: req.params.id
    } 
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function showTipologias(req, res) {
  return Solicitud.findAll({
    include: [{ model: Tipologia, as: "Tipologia" }],
    where: {
      fk_tipologia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  console.log("CREAR RESERVA");
  return Solicitud.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Solicitud in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Solicitud.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Solicitud from the DB
export function destroy(req, res) {
  return Solicitud.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
