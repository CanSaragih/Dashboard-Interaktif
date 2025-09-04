const RegencyController = require("../controllers/regencyController");

const router = require("express").Router();

router.get("/:id", RegencyController.getRegencySummary);

module.exports = router;
