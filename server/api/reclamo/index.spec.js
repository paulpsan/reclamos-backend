'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reclamoCtrlStub = {
  index: 'reclamoCtrl.index',
  show: 'reclamoCtrl.show',
  create: 'reclamoCtrl.create',
  update: 'reclamoCtrl.update',
  destroy: 'reclamoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reclamoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reclamo.controller': reclamoCtrlStub
});

describe('Reclamo API Router:', function() {

  it('should return an express router instance', function() {
    reclamoIndex.should.equal(routerStub);
  });

  describe('GET /api/reclamos', function() {

    it('should route to reclamo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reclamoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reclamos/:id', function() {

    it('should route to reclamo.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reclamoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reclamos', function() {

    it('should route to reclamo.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reclamoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reclamos/:id', function() {

    it('should route to reclamo.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reclamoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reclamos/:id', function() {

    it('should route to reclamo.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reclamoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reclamos/:id', function() {

    it('should route to reclamo.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reclamoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
