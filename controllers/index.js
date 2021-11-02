const router = require("express").Router();

const apiRoutes = require("./api");
const htmlRoutes = require("./htmlRoutes");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
