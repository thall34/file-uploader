const db = require('../models/userModels');
const bcrypt = require('bcryptjs')
const { validationResult, matchedData } = require('express-validator');

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

async function getUserById(req, res, next) {
    const id = req.validatedId;
    try {
        await db.getUserById(id)
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
        await db.createUser(username, hashedPassword);
        res.redirect('/')
    } catch(error) {
        next(error);
    };
};

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

module.exports = {
    getUserPage,
    getUserById,
    postNewUser,
    getNewUserForm,
    logOutUser,
}