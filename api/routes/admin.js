var express = require("express");
var router = express.Router();
let admContrl = require("../controllers/adminControllers");

router.post("/add", admContrl.addMovie);
router.post("/addF", admContrl.addFunction);
router.post("/create", admContrl.createRoom);
router.delete("/create/:id", admContrl.deleteRoom);
router.put("/rooms/:id", admContrl.putRoom)
router.get("/rooms", admContrl.getRooms);
router.get("/rooms/:id", admContrl.getRoom);


module.exports = router;
