const { Router } = require('express');
const folderRouter = Router();
const folderController = require('../controllers/folderController');
// const validateId = require('../middleware/validateId');
// const validateNewUser = require('../middleware/validateNewUser');
// const validateLogin = require('../middleware/validateLogin');
// const authenticateUser = require('../middleware/authenticateUser');

folderRouter.get('/new', folderController.getNewFolderForm);
folderRouter.post('/new', folderController.postNewFolder);

module.exports = folderRouter;