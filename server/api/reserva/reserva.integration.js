'use strict';

var app = require('../..');
import request from 'supertest';

var newReserva;

describe('Reserva API:', function() {

  describe('GET /api/reservas', function() {
    var reservas;

    beforeEach(function(done) {
      request(app)
        .get('/api/reservas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reservas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reservas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reservas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reservas')
        .send({
          name: 'New Reserva',
          info: 'This is the brand new reserva!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReserva = res.body;
          done();
        });
    });

    it('should respond with the newly created reserva', function() {
      newReserva.name.should.equal('New Reserva');
      newReserva.info.should.equal('This is the brand new reserva!!!');
    });

  });

  describe('GET /api/reservas/:id', function() {
    var reserva;

    beforeEach(function(done) {
      request(app)
        .get('/api/reservas/' + newReserva._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reserva = res.body;
          done();
        });
    });

    afterEach(function() {
      reserva = {};
    });

    it('should respond with the requested reserva', function() {
      reserva.name.should.equal('New Reserva');
      reserva.info.should.equal('This is the brand new reserva!!!');
    });

  });

  describe('PUT /api/reservas/:id', function() {
    var updatedReserva;

    beforeEach(function(done) {
      request(app)
        .put('/api/reservas/' + newReserva._id)
        .send({
          name: 'Updated Reserva',
          info: 'This is the updated reserva!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReserva = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReserva = {};
    });

    it('should respond with the updated reserva', function() {
      updatedReserva.name.should.equal('Updated Reserva');
      updatedReserva.info.should.equal('This is the updated reserva!!!');
    });

  });

  describe('DELETE /api/reservas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reservas/' + newReserva._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reserva does not exist', function(done) {
      request(app)
        .delete('/api/reservas/' + newReserva._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
