const { Router } = require('express');

const { auth } = require('../middlewares/auth');

const EnrollmentController = require('../controllers/EnrollmentController');

const enrollmentRoutes = new Router();

enrollmentRoutes.post('/', auth, EnrollmentController.create);

module.exports = enrollmentRoutes;