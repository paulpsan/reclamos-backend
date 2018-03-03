/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reservas              ->  index
 * POST    /api/reservas              ->  create
 * GET     /api/reservas/:id          ->  show
 * PUT     /api/reservas/:id          ->  update
 * DELETE  /api/reservas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Reserva} from '../../sqldb';
import {Horario} from '../../sqldb';
import {Persona} from '../../sqldb';
import {Medico} from '../../sqldb';
import {Especialidad} from '../../sqldb';

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
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
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

// Gets a list of Reservas
export function index(req, res) {
  console.log("POSIBLE ERROR EN INDEX");
  return Reserva.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reserva from the DB
export function show(req, res) {
    console.log("POSIBLE EN SHOW");
    return Reserva.findAll({
    where: {
      fk_asegurado: req.params.id
    },
    include:[
    {
      model:Horario,
      as:'Horario',
      include:[
        {
          model:Especialidad,
          as:'Especialidad'
        },
        {
          model:Medico,
          as:'Medico',
          include:[{
            model:Persona,
            as:'Persona'
          }]
        }
      ]
    }
    ]
  })
      .then(respondWithResult(res))
      .catch(handleError(res));
}


export function create(req, res) {
  console.log("CREAR RESERVA");
  return Reserva.create(req.body)
    .then(function(entity){
      Horario.find({
        where:{
          _id:entity.fk_horario
        }
      })
      .then(function(horario){
          if (horario) {
            var fichas = horario.fichas_actual;
            fichas--;
            horario.fechas_actual = fichas;
            horario.updateAttributes(['fichas_actual'])
            //res.status(statusCode).json({});
          }
          res.send(horario).end();
      })
      .catch(function(errorHorario){
        console.log("ERROR horario =",errorHorario);
        res.status(500).send(errorHorario);
      })
    })
    .catch(function(err){
      console.log("ERROR reserva =",err);
        res.status(500).send(err);
    });
}




/*
function(reserva){
  Horario.find({
    where:{
      _id:reserva.fk_horario
    }
  })
  .then(handleEntityNotFound(res))
  .then(function(entity) {
    if (entity) {
      var fichas = entity.fichas_actual;
      fichas--;
      entity.fechas_actual = fichas;
      entity.updateAttributes(['fichas_actual'])
      res.status(statusCode).json({});
    }
  }
  )
  .catch(handleError(res));
}
*/

// Updates an existing Reserva in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Reserva.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reserva from the DB
export function destroy(req, res) {
  return Reserva.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
