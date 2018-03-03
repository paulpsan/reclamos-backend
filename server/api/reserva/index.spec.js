'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reservaCtrlStub = {
  index: 'reservaCtrl.index',
  show: 'reservaCtrl.show',
  create: 'reservaCtrl.create',
  update: 'reservaCtrl.update',
  destroy: 'reservaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reservaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reserva.controller': reservaCtrlStub
});

describe('Reserva API Router:', function() {

  it('should return an express router instance', function() {
    reservaIndex.should.equal(routerStub);
  });

  describe('GET /api/reservas', function() {

    it('should route to reserva.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reservaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reservas/:id', function() {

    it('should route to reserva.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reservaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reservas', function() {

    it('should route to reserva.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reservaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reservas/:id', function() {

    it('should route to reserva.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reservaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reservas/:id', function() {

    it('should route to reserva.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reservaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reservas/:id', function() {

    it('should route to reserva.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reservaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
