const { Router } = require('express');
const fileRouter = Router();
const fileController = require('../controllers/fileController');
const validateId = require('../middleware/validateId');
const uploadFile = require('../middleware/multer');

fileRouter.get('/new/:id', validateId, fileController.getNewFileForm);
fileRouter.post('/new/:id', validateId, uploadFile, fileController.postNewFile);
fileRouter.get('/update/:id', validateId, fileController.getUpdateFileForm);
fileRouter.post('/update/:id', validateId, fileController.postUpdatedFile);
fileRouter.get('/delete/:id', validateId, fileController.deleteFile);
fileRouter.get('/download/:id', validateId, fileController.downloadFile);
fileRouter.get('/:id', validateId, fileController.getFilePage);

module.exports = fileRouter;