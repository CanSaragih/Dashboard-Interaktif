const router = require("express").Router();
const nationalRoutes = require("./nationalRoutes");
const provinceRoutes = require("./provinceRoutes");
const regencyRoutes = require("./regencyRoutes");

router.use("/national", nationalRoutes);
router.use("/province", provinceRoutes);
router.use("/regency", regencyRoutes);

module.exports = router;
