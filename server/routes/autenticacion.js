'use strict';

var express = require('express');
var controller = require("../controllers/autenticacion");

var router = express.Router();


router.post('/', controller.autenticar);

module.exports = router;
