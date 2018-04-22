/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Interacciones              ->  index
 * POST    /api/Interacciones              ->  create
 * GET     /api/Interacciones/:id          ->  show
 * PUT     /api/Interacciones/:id          ->  update
 * DELETE  /api/Interacciones/:id          ->  destroy
 */

"use strict";

import _ from "lodash";
import { Interaccion } from "../sqldb";
import { Reclamo } from "../sqldb";
const nodemailer = require("nodemailer");

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

// Gets a list of Interacciones
export function index(req, res) {
  if (req.query.entrada && req.query.categoria) {
    return Interaccion.findAll({
      where: {
        entrada: req.query.entrada,
        categoria: req.query.categoria
      }
    })
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    return Interaccion.findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}
// Gets a single Interaccion from the DB
export function show(req, res) {
  return (
    Interaccion.find({
      where: {
        _id: req.params.id
      }
    })
      // .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res))
  );
}

// Creates a new Interaccion in the DB
export function create(req, res) {
  return Interaccion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Interaccion in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Interaccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Interaccion from the DB
export function destroy(req, res) {
  return Interaccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
