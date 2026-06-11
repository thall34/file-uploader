const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const validateId = require('../middleware/validateId');
const validateNewUser = require('../middleware/validateNewUser');
const validateLogin = require('../middleware/validateLogin');
const authenticateUser = require('../middleware/authenticateUser');

userRouter.get('/', userController.getUserPage);
userRouter.get('/new', userController.getNewUserForm);
userRouter.post('/new', validateNewUser, userController.postNewUser);
userRouter.post('/login', validateLogin, authenticateUser);
userRouter.get('/logout', userController.logOutUser);

module.exports = userRouter;