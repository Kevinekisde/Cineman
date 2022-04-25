var express = require("express");
var router = express.Router();
var ProductController = require("../controllers/ProductsController")

router.get("/i", ProductController.all);



module.exports = router;