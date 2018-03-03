'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var medicoCtrlStub = {
  index: 'ueCtrl.index',
  show: 'ueCtrl.show',
  create: 'ueCtrl.create',
  update: 'ueCtrl.update',
  destroy: 'ueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var medicoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ue.controller': medicoCtrlStub
});

describe('Ue API Router:', function() {

  it('should return an express router instance', function() {
    medicoIndex.should.equal(routerStub);
  });

  describe('GET /api/unidades-educativas', function() {

    it('should route to ue.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ueCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/unidades-educativas/:id', function() {

    it('should route to ue.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ueCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/unidades-educativas', function() {

    it('should route to ue.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ueCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/unidades-educativas/:id', function() {

    it('should route to ue.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/unidades-educativas/:id', function() {

    it('should route to ue.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/unidades-educativas/:id', function() {

    it('should route to ue.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ueCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
