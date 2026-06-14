const db = require('../models/folderModels');

// validates that the folder userId matches the current logged in user's id
async function checkFolderOwnership(req, res, next) {
    const id = req.validatedId;

    try {
        const folder = await db.getFolderById(id);
        if (!folder) {
            return res.status(404).render('errors', {
                title: '404 - Folder not found',
                message: '404 - Folder not found',
            });
        };

        if (folder.userId !== req.user.id) {
            return res.status(403).render('errors', {
                title: '403 - Forbidden',
                message: '403 - Forbidden',
            });
        };

        next();
    } catch(error) {
        next(error);
    }
};

module.exports = checkFolderOwnership;