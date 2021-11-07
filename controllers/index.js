const router = require("express").Router();

const apiRoutes = require("./api");
const htmlRoutes = require("./htmlRoutes");
// const dashboardRoutes = require("./dashboardRoutes");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
// router.use("/dashboard", dashboardRoutes);

module.exports = router;
