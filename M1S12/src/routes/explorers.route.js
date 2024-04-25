const { Router } = require('express'); 

const { auth } = require('../middlewares/auth');
const ExplorerController = require('../controllers/ExplorerController');

const explorerRoutes = new Router();

explorerRoutes.post('/', ExplorerController.create);
explorerRoutes.get('/', auth, ExplorerController.showAll);
explorerRoutes.get('/:id', auth, ExplorerController.showOne);
explorerRoutes.put('/:id', auth, ExplorerController.update);
explorerRoutes.delete('/:id', auth, ExplorerController.delete);

module.exports = explorerRoutes;