/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/autenticacion              ->  Autenticar con {usuario:x, password:y}
 */

'use strict';

import _ from 'lodash';
import {Usuario} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  console.log("Usuario encontrado");
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}


function handleEntityNotFound(res) {
  console.log("Usuario no encontrado");
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
  console.log("Error al buscar");
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Autenticar
export function autenticar(req, res) {
  console.log("REQ>");
  console.log(req.body);
  return Usuario.find({
    where: req.body
  })
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}
