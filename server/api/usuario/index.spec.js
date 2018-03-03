'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usuarioCtrlStub = {
  index: 'usuarioCtrl.index',
  show: 'usuarioCtrl.show',
  create: 'usuarioCtrl.create',
  update: 'usuarioCtrl.update',
  destroy: 'usuarioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usuarioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './usuario.controller': usuarioCtrlStub
});

describe('Usuario API Router:', function() {

  it('should return an express router instance', function() {
    usuarioIndex.should.equal(routerStub);
  });

  describe('GET /api/usuarios', function() {

    it('should route to usuario.controller.index', function() {
      routerStub.get
        .withArgs('/', 'usuarioCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/usuarios/:id', function() {

    it('should route to usuario.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'usuarioCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/usuarios', function() {

    it('should route to usuario.controller.create', function() {
      routerStub.post
        .withArgs('/', 'usuarioCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/usuarios/:id', function() {

    it('should route to usuario.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'usuarioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/usuarios/:id', function() {

    it('should route to usuario.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'usuarioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/usuarios/:id', function() {

    it('should route to usuario.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'usuarioCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
