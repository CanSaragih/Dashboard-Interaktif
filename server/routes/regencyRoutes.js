const RegencyController = require("../controllers/regencyController");

const router = require("express").Router();

router.get("/:id", RegencyController.getById);

module.exports = router;
