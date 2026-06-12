const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const validateId = require('../middleware/validateId');
const validateUser = require('../middleware/validateUser');
const validateLogin = require('../middleware/validateLogin');
const authenticateUser = require('../middleware/authenticateUser');

userRouter.get('/', userController.getUserPage);
userRouter.get('/new', userController.getNewUserForm);
userRouter.post('/new', validateUser, userController.postNewUser);
userRouter.get('/update/:id', validateId, userController.getUpdateUserForm);
userRouter.post('/update/:id', validateId, validateUser, userController.postUpdatedUser);
userRouter.get('/delete/:id', validateId, userController.deleteUser);
userRouter.post('/login', validateLogin, authenticateUser);
userRouter.get('/logout', userController.logOutUser);

module.exports = userRouter;