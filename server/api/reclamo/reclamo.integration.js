'use strict';

var app = require('../..');
import request from 'supertest';

var newReclamo;

describe('Reclamo API:', function() {

  describe('GET /api/reclamos', function() {
    var reclamos;

    beforeEach(function(done) {
      request(app)
        .get('/api/reclamos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reclamos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reclamos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reclamos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reclamos')
        .send({
          name: 'New Reclamo',
          info: 'This is the brand new reclamo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReclamo = res.body;
          done();
        });
    });

    it('should respond with the newly created reclamo', function() {
      newReclamo.name.should.equal('New Reclamo');
      newReclamo.info.should.equal('This is the brand new reclamo!!!');
    });

  });

  describe('GET /api/reclamos/:id', function() {
    var reclamo;

    beforeEach(function(done) {
      request(app)
        .get('/api/reclamos/' + newReclamo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reclamo = res.body;
          done();
        });
    });

    afterEach(function() {
      reclamo = {};
    });

    it('should respond with the requested reclamo', function() {
      reclamo.name.should.equal('New Reclamo');
      reclamo.info.should.equal('This is the brand new reclamo!!!');
    });

  });

  describe('PUT /api/reclamos/:id', function() {
    var updatedReclamo;

    beforeEach(function(done) {
      request(app)
        .put('/api/reclamos/' + newReclamo._id)
        .send({
          name: 'Updated Reclamo',
          info: 'This is the updated reclamo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReclamo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReclamo = {};
    });

    it('should respond with the updated reclamo', function() {
      updatedReclamo.name.should.equal('Updated Reclamo');
      updatedReclamo.info.should.equal('This is the updated reclamo!!!');
    });

  });

  describe('DELETE /api/reclamos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reclamos/' + newReclamo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reclamo does not exist', function(done) {
      request(app)
        .delete('/api/reclamos/' + newReclamo._id)
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
