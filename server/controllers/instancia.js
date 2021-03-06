/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/instancias              ->  index
 * POST    /api/instancias              ->  create
 * GET     /api/instancias/:id          ->  show
 * PUT     /api/instancias/:id          ->  update
 * DELETE  /api/instancias/:id          ->  destroy
 */

"use strict";

import _ from "lodash";
import { Instancia } from "../sqldb";
import { Interaccion } from "../sqldb";
import { InstanciaInteraccion } from "../sqldb";
import { Sequelize } from "sequelize";
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

// Gets a list of Instancias
export function index(req, res) {
  return Instancia.findAll({
    include: [{ all: true }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function showInteracion(req, res) {
  return Instancia.findAll({
    where: { entrada: req.params.id },
    include: [{ all: true }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Instancia from the DB
export function show(req, res) {
  return Instancia.find({
    include: [{ all: true }],
    where: { entrada: req.params.id }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Instancia in the DB
export function create(req, res) {
  return Instancia.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function createInteraccion(req, res) {
  return InstanciaInteraccion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Instancia in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Instancia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Instancia from the DB
export function destroy(req, res) {
  return Instancia.find({
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
  return Instancia.findAll({
    include: [{ all: true }],
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
export function graficas(req, res) {
  let canal = req.params.id.toUpperCase();
  if (canal == "TODO") {
    return Instancia.findAll({
      // include: [{ all: true }],
      attributes: [
        "canal",
        [Sequelize.fn("COUNT", Sequelize.col("canal")), "cont"]
      ],
      group: ["canal"]
    }).then(result => {
      res.send(result);
    });
  } else {
    return Instancia.findAll({
      include: [{ all: true }],
      where: {
        canal: canal
      }
    })
      .then(response => {
        let contConsulta = 0;
        let contRequerimiento = 0;
        let contDenuncia = 0;
        for (const iterator of response) {
          for (const interac of iterator.Interacciones) {
            console.log("object", interac.categoria);
            if (interac.categoria == "Consulta") {
              contConsulta++;
            } else {
              if (interac.categoria == "Requerimiento") {
                contRequerimiento++;
              } else {
                contDenuncia++;
              }
            }
          }
        }
        let objRes = [
          { label: "Consultas", cont: contConsulta },
          { label: "Requerimiento", cont: contRequerimiento },
          { label: "Denuncias", cont: contDenuncia }
        ];

        return res.status(200).json(objRes);
      })
      .catch(handleError(res));
  }
}
