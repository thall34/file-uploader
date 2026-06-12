const db = require('../models/userModels');
const bcrypt = require('bcryptjs')
const { validationResult, matchedData } = require('express-validator');

async function logOutUser(req, res, next) {
    try {
        req.logout((error) => {
            if (error) {
                return next(error);
            };
            
            res.redirect('/')
        });
    } catch(error) {
        next(error);
    };
};

async function getUserPage(req, res, next) {
    try {
        res.render('user', {
            title: 'User Dropbox',
            user: req.user,
        });
    } catch(error) {
        next(error);
    };
};

async function getNewUserForm(req, res, next) {
    try {
        res.render('newUserForm', {
            title: 'Create New User',
        });
    } catch(error) {
        next(error);
    };
};

async function getUpdateUserForm(req, res, next) {
    const id = req.validatedId;

    try {
        res.render('updateUserForm', {
            title: 'Update User',
            id: id,
        });
    } catch(error) {
        next(error);
    };
};

async function postNewUser(req, res, next) {
    const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('errors', {
                title: 'Registration error',
            });
        };

    try {
        const { username, password } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.createNewUser(username, hashedPassword);
        res.redirect('/')
    } catch(error) {
        next(error);
    };
};

async function postUpdatedUser(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).render('errors', {
                title: 'Update error',
            });
        };

    try {
        const { username, password } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.updateUserById(username, hashedPassword, id);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

async function deleteUser(req, res, next) {
    const id = req.validatedId;

    try {
        await db.deleteUserById(id);
        await logOutUser();
    } catch(error) {
        next(error);
    };
};

module.exports = {
    logOutUser,
    getUserPage,
    getNewUserForm,
    getUpdateUserForm,
    postNewUser,
    postUpdatedUser,
    deleteUser,
}