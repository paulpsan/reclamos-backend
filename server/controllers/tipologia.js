"use strict";
import { Tipologia } from "../sqldb";


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
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
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    console.log("entidad",entity);
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  console.log("por que",res);
  statusCode = statusCode || 500;
  
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return Tipologia.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Tipologia from the DB
export function show(req, res) {
  return Tipologia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tipologia in the DB
export function create(req, res) {
  console.log("obj",req.body);
  return Tipologia.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Tipologia in the DB at the specified ID
// export function upsert(req, res) {
//   if(req.body._id) {
//     delete req.body._id;
//   }

//   return Tipologia.upsert(req.body, {
//     where: {
//       _id: req.params.id
//     }
//   })
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// Updates an existing Reclamo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Tipologia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Deletes a Tipologia from the DB
export function destroy(req, res) {
  return Tipologia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}