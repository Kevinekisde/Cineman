var express = require("express");
var router = express.Router();
let userController = require("../controllers/userControllers");

router.get("/:id", userController.id);
router.put("/:id", userController.editUser);
router.post("/createuser", userController.createUser);
router.post("/checkout", userController.newticket);
router.post("/comments", userController.postComments);
router.get("/ticket/:id_pago", userController.getTicket);

module.exports = router;
