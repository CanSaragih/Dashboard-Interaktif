const ProvinceController = require("../controllers/provinceController");
const router = require("express").Router();

router.get("/:id", ProvinceController.getProvinceSummary);

module.exports = router;
