"use strict";

var express = require("express");
var controller = require("../controllers/instancia");

var router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.get("/:id/interacciones/:interaccion", controller.showInteracion);
router.post("/", controller.create);
router.post("/reporte/", controller.reporte);
router.get("/graficas/:id", controller.graficas);
router.post("/:id/interacciones", controller.createInteraccion);
router.put("/:id", controller.update);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
