const db = require('../models/fileModels');

// validates that the folder userId matches the current logged in user's id
async function checkFileOwnership(req, res, next) {
    const id = req.validatedId;

    try {
        const file = await db.getFileById(id);
        if (!file) {
            return res.status(404).render('errors', {
                title: '404 - File not found',
                message: '404 - File not found',
            });
        };

        if (file.folder.userId !== req.user.id) {
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

module.exports = checkFileOwnership;