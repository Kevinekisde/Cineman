var express = require("express");
var router = express.Router();
var SALAController = require("../controllers/SALAController.js");
var PeliController = require("../controllers/PeliController.js");
var CategoryController = require("../controllers/CategoryController.js");
const functionControllers = require("../controllers/functionControllers.js");
/*
 * GET
 */
router.get("/functions", functionControllers.getFunctions);
router.put("/functions", functionControllers.setSeats);
router.get("/functions/:id", functionControllers.getFunction);

router.get("/peliculas", PeliController.all);
router.get("/peliculas/:id", PeliController.id);

router.get("/categorias", CategoryController.list);

router.get("/salas", SALAController.list);
router.get("/:id", SALAController.show);

/*
 * POST
 */
router.post("/", SALAController.create);

/*
 * PUT
 */
router.put("/:id", SALAController.update);

/*
 * DELETE
 */
router.delete("/:id", SALAController.remove);

module.exports = router;
