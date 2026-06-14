const { Router } = require('express');
const folderRouter = Router();
const folderController = require('../controllers/folderController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const checkFolderOwnership = require('../middleware/checkFolderOwnership');

folderRouter.get('/new', isAuthenticated, folderController.getNewFolderForm);
folderRouter.post('/new', isAuthenticated, folderController.postNewFolder);
folderRouter.get('/update/:id', isAuthenticated, validateId, checkFolderOwnership, folderController.getUpdateFolderForm);
folderRouter.post('/update/:id', isAuthenticated, validateId, checkFolderOwnership, folderController.postUpdatedFolder);
folderRouter.get('/delete/:id', isAuthenticated, validateId, checkFolderOwnership, folderController.deleteFolder);
folderRouter.get('/:id', isAuthenticated, validateId, checkFolderOwnership, folderController.getFolderPage);

module.exports = folderRouter;