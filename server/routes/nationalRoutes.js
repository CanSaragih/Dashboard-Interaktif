const NationalController = require("../controllers/nationalController");

const router = require("express").Router();

router.get("/", NationalController.getNational);
router.get("/by-province", NationalController.getNationalByProvince);

module.exports = router;
