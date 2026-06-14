const db = require('../models/folderModels');

// loads folder view page
async function getFolderPage(req, res, next) {
    const id = req.validatedId;
    const folder = await db.getFolderById(id);

    try {
        res.render('folder', {
            title: folder.name,
            folder: folder,
        });
    } catch(error) {
        next(error);
    };
};

// loads new folder form
async function getNewFolderForm(req, res, next) {
    try {
        res.render('newFolderForm', {
            title: 'New Folder',
        });
    } catch(error) {
        next(error);
    };
};

// loads update folder name form
async function getUpdateFolderForm(req, res, next) {
    const id = req.validatedId;
    const folder = await db.getFolderById(id);

    try {
        res.render('updateFolderForm', {
            title: 'Update Folder',
            id: id,
            folder: folder,
        });
    } catch(error) {
        next(error);
    };
};

// creates new folder in database and links it to the current user
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

// updates folder name in database
async function postUpdatedFolder(req, res, next) {
    const { name } = req.body;
    const id = req.validatedId;

    try {
        await db.updateFolderById(name, id);
        res.redirect(`/folder/${id}`);
    } catch(error) {
        next(error);
    };
};

// deletes folder from database
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