const { Router } = require("express");
const userRoutes = require("./users.route");
const courseRoutes = require("./courses.route");
const loginRoutes = require("./login.route");
const enrollmentRoutes = require("./enrollments.route");

const routes = Router();

routes.use('/users', userRoutes)
routes.use('/courses', courseRoutes)
routes.use('/login', loginRoutes)
routes.use('/enrollments', enrollmentRoutes)

module.exports = routes;