const { Router } = require("express");

const explorerRoutes = require("./explorers.route");
const areaRoutes = require("./areas.route");
const loginRoutes = require("./login.route");

const routes = Router();

routes.use('/explorers', explorerRoutes);
routes.use('/areas', areaRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;