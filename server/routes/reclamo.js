'use strict';

var express = require('express');
var controller = require("../controllers/reclamo");

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post("/reporte/", controller.reporte);
router.get("/reportes/:id", controller.graficas);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
