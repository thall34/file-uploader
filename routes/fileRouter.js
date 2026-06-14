const { Router } = require('express');
const fileRouter = Router();
const fileController = require('../controllers/fileController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const uploadFile = require('../middleware/multer');
const checkFileOwnership = require('../middleware/checkFileOwnership');
const checkFolderOwnership = require('../middleware/checkFolderOwnership');

fileRouter.get('/new/:id', isAuthenticated, validateId, checkFolderOwnership, fileController.getNewFileForm);
fileRouter.post('/new/:id', isAuthenticated, validateId, checkFolderOwnership, fileController.postNewFile);
fileRouter.get('/update/:id', isAuthenticated, validateId, checkFileOwnership, fileController.getUpdateFileForm);
fileRouter.post('/update/:id', isAuthenticated, validateId, checkFileOwnership, fileController.postUpdatedFile);
fileRouter.get('/delete/:id', isAuthenticated, validateId, checkFileOwnership, fileController.deleteFile);
fileRouter.get('/download/:id', isAuthenticated, validateId, checkFileOwnership, fileController.downloadFile);
fileRouter.get('/:id', isAuthenticated, validateId, checkFileOwnership, fileController.getFilePage);

module.exports = fileRouter;