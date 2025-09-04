const ProvinceController = require("../controllers/provinceController");

const router = require("express").Router();

router.get("/", ProvinceController.getAll);
router.get("/:id", ProvinceController.getById);

module.exports = router;
