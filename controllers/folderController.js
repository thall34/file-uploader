const db = require('../models/folderModels');

async function getFolderPage(req, res, next) {
    const id = req.validatedId;
    const folder = await db.getFolderById(id);

    try {
        res.render('folder', {
            title: folder.name,
            files: folder.files,
        });
    } catch(error) {
        next(error);
    };
};

async function getNewFolderForm(req, res, next) {
    try {
        res.render('newFolderForm', {
            title: 'New Folder',
        });
    } catch(error) {
        next(error);
    };
};

async function getUpdateFolderForm(req, res, next) {
    const id = req.validatedId;

    try {
        res.render('updateFolderForm', {
            title: 'Update Folder',
            id: id,
        });
    } catch(error) {
        next(error);
    };
};

async function postNewFolder(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;

    try {
        await db.createNewFolder(name, id);
        res.redirect('/user');
    } catch(error) {
        next(error);
    };
};

async function postUpdatedFolder(req, res, next) {
    const { name } = req.body;
    const id = req.validatedId;

    try {
        await db.updateFolderById(name, id);
        res.redirect('/user');
    } catch(error) {
        next(error);
    };
};

async function deleteFolder(req, res, next) {
    const id = req.validatedId;
    try {
        await db.deleteFolderById(id);
        res.redirect('/user');
    } catch(error) {
        next(error);
    };
};

module.exports = {
    getFolderPage,
    getNewFolderForm,
    getUpdateFolderForm,
    postNewFolder,
    postUpdatedFolder,
    deleteFolder,
};