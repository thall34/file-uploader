const db = require('../models/fileModels');
const { uploadToCloudinary, cloudinary } = require('../config/cloudinary');

// loads file view page
async function getFilePage(req, res, next) {
    const id = req.validatedId;
    const file = await db.getFileById(id);

    try {
        res.render('file', {
            title: file.fileName,
            file: file,
        });
    } catch(error) {
        next(error);
    };
};

// loads new file upload form
async function getNewFileForm(req, res, next) {
    const id = req.validatedId;

    try {
        res.render('newFileForm', {
            title: 'New File',
            id: id,
        });
    } catch(error) {
        next(error);
    };
};

// loads file name update form
async function getUpdateFileForm(req, res, next) {
    const id = req.validatedId;
    const file = await db.getFileById(id);

    try {
        res.render('updateFileForm', {
            title: 'Update File',
            id: id,
            file: file,
        });
    } catch(error) {
        next(error);
    };
};

// adds new file info to database and uploads to cloudinary
async function postNewFile(req, res, next) {
    const { originalname, size } = req.file
    const id = req.validatedId;
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

    try {
        await db.createNewFile(originalname, cloudinaryResult.secure_url, cloudinaryResult.public_id, size, id);
        res.redirect(`/folder/${id}`);
    } catch(error) {
        next(error);
    };
};

// updates filename in database only
async function postUpdatedFile(req, res, next) {
    const { fileName } = req.body
    const id = req.validatedId;

    try {
        await db.updateFileById(fileName, id);
        res.redirect(`/file/${id}`);
    } catch(error) {
        next(error);
    };
};

// deletes file from cloudinary and file record from database
async function deleteFile(req, res, next) {
    const id = req.validatedId;
    const file = await db.getFileById(id);

    try {
        await cloudinary.uploader.destroy(file.cloudinaryId);
        await db.deleteFileById(id);
        res.redirect(`/folder/${file.folderId}`);
    } catch(error) {
        next(error);
    };
};

// downloads file from cloudinary using unique path
async function downloadFile(req, res, next) {
    const id = req.validatedId;
    const file = await db.getFileById(id);

    try {
        res.redirect(file.path);
    } catch(error) {
        next(error);
    };
};

module.exports = {
    getFilePage,
    getNewFileForm,
    getUpdateFileForm,
    postNewFile,
    postUpdatedFile,
    deleteFile,
    downloadFile,
};