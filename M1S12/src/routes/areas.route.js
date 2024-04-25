const { Router, query } = require('express');

const AreaController = require('../controllers/AreaController');

const areaRoutes = new Router();

areaRoutes.post('/', AreaController.create);
areaRoutes.get('/',  AreaController.showAll);
areaRoutes.get('/',  AreaController.showFilter);
areaRoutes.put('/:id', AreaController.update);
areaRoutes.delete('/:id', AreaController.delete);

module.exports = areaRoutes;