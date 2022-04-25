const { Router } = require("express");
const router = Router();

const SALAroutes = require("./SALARoutes");
const user = require("./user");
const admin = require("./admin");
const mercadopago = require("./mercadopago");
const product = require("./product");

router.use("/user", user);
router.use("/", SALAroutes);
router.use("/admin", admin);
router.use("/mercadopago", mercadopago);
router.use("/products",product)

module.exports = router;
