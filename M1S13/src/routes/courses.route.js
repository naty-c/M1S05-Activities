const { Router } = require('express') 

const CourseController = require('../controllers/CourseController')

const courseRoutes = new Router()

courseRoutes.post('/', CourseController.create);
courseRoutes.get('/', CourseController.showAll);
courseRoutes.get('/:id', CourseController.showOne);
courseRoutes.get('/filter', CourseController.showFilter);
courseRoutes.put('/:id', CourseController.update);
courseRoutes.delete('/:id', CourseController.delete);

module.exports = courseRoutes;