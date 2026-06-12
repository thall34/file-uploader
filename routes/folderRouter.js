const { Router } = require('express');
const folderRouter = Router();
const folderController = require('../controllers/folderController');
const validateId = require('../middleware/validateId');

folderRouter.get('/new', folderController.getNewFolderForm);
folderRouter.post('/new', folderController.postNewFolder);
folderRouter.get('/update/:id', validateId, folderController.getUpdateFolderForm);
folderRouter.post('/update/:id', validateId, folderController.postUpdatedFolder);
folderRouter.get('/delete/:id', validateId, folderController.deleteFolder);
folderRouter.get('/:id', validateId, folderController.getFolderPage);

module.exports = folderRouter;