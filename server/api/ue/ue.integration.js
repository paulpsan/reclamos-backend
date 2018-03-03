'use strict';

var app = require('../..');
import request from 'supertest';

var newMedico;

describe('Ue API:', function() {

  describe('GET /api/unidades-educativas', function() {
    var ues;

    beforeEach(function(done) {
      request(app)
        .get('/api/unidades-educativas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ues.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/unidades-educativas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/unidades-educativas')
        .send({
          name: 'New Ue',
          info: 'This is the brand new medico!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMedico = res.body;
          done();
        });
    });

    it('should respond with the newly created medico', function() {
      newMedico.name.should.equal('New Ue');
      newMedico.info.should.equal('This is the brand new medico!!!');
    });

  });

  describe('GET /api/unidades-educativas/:id', function() {
    var medico;

    beforeEach(function(done) {
      request(app)
        .get('/api/unidades-educativas/' + newMedico._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          medico = res.body;
          done();
        });
    });

    afterEach(function() {
      medico = {};
    });

    it('should respond with the requested medico', function() {
      medico.name.should.equal('New Ue');
      medico.info.should.equal('This is the brand new medico!!!');
    });

  });

  describe('PUT /api/unidades-educativas/:id', function() {
    var updatedMedico;

    beforeEach(function(done) {
      request(app)
        .put('/api/unidades-educativas/' + newMedico._id)
        .send({
          name: 'Updated Ue',
          info: 'This is the updated medico!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMedico = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedico = {};
    });

    it('should respond with the updated medico', function() {
      updatedMedico.name.should.equal('Updated Ue');
      updatedMedico.info.should.equal('This is the updated medico!!!');
    });

  });

  describe('DELETE /api/unidades-educativas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/unidades-educativas/' + newMedico._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when medico does not exist', function(done) {
      request(app)
        .delete('/api/unidades-educativas/' + newMedico._id)
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
