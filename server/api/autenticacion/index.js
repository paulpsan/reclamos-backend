'use strict';

var express = require('express');
var controller = require('./autenticacion.controller');

var router = express.Router();


router.post('/', controller.autenticar);

module.exports = router;
