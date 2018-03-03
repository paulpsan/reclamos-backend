/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/unidades-educativas              ->  index
 * POST    /api/unidades-educativas              ->  create
 * GET     /api/unidades-educativas/:id          ->  show
 * PUT     /api/unidades-educativas/:id          ->  update
 * DELETE  /api/unidades-educativas/:id          ->  destroy
 */

"use strict";

import _ from "lodash";
import { Ue } from "../../sqldb";
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

// Gets a list of Ue
export function index(req, res) {
  return Ue.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Ue from the DB
export function show(req, res) {
  return Ue.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// gets a list Ue from the DB
export function search(req, res) {
  console.log("req", req.body.des_ue);
  return (Ue.findAll({
      where: {
        des_ue: { $like: "%" + req.body.des_ue + "%" }
      }
    })
      .then(respondWithResult(res))
      .catch(handleError(res)) );
}

// Creates a new Ue in the DB
export function create(req, res) {
  return Ue.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Ue in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Ue.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Ue from the DB
export function destroy(req, res) {
  return Ue.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
