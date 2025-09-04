const NationalController = require("../controllers/nationalController");

const router = require("express").Router();

router.get("/", NationalController.getNational);

module.exports = router;
