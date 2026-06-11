const db = require('../models/folderModels');

async function getNewFolderForm(req, res, next) {
    try {
        res.render('newFolderForm', {
            title: 'New Folder',
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

module.exports = {
    getNewFolderForm,
    postNewFolder,
}