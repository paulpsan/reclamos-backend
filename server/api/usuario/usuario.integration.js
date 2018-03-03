'use strict';

var app = require('../..');
import request from 'supertest';

var newUsuario;

describe('Usuario API:', function() {

  describe('GET /api/usuarios', function() {
    var usuarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuarios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      usuarios.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/usuarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/usuarios')
        .send({
          name: 'New Usuario',
          info: 'This is the brand new usuario!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUsuario = res.body;
          done();
        });
    });

    it('should respond with the newly created usuario', function() {
      newUsuario.name.should.equal('New Usuario');
      newUsuario.info.should.equal('This is the brand new usuario!!!');
    });

  });

  describe('GET /api/usuarios/:id', function() {
    var usuario;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarios/' + newUsuario._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuario = res.body;
          done();
        });
    });

    afterEach(function() {
      usuario = {};
    });

    it('should respond with the requested usuario', function() {
      usuario.name.should.equal('New Usuario');
      usuario.info.should.equal('This is the brand new usuario!!!');
    });

  });

  describe('PUT /api/usuarios/:id', function() {
    var updatedUsuario;

    beforeEach(function(done) {
      request(app)
        .put('/api/usuarios/' + newUsuario._id)
        .send({
          name: 'Updated Usuario',
          info: 'This is the updated usuario!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUsuario = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsuario = {};
    });

    it('should respond with the updated usuario', function() {
      updatedUsuario.name.should.equal('Updated Usuario');
      updatedUsuario.info.should.equal('This is the updated usuario!!!');
    });

  });

  describe('DELETE /api/usuarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/usuarios/' + newUsuario._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usuario does not exist', function(done) {
      request(app)
        .delete('/api/usuarios/' + newUsuario._id)
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
