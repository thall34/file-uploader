const multer = require('multer');

const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },
    fileFilter: (req, file, cb) => {
        if(allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
});

const uploadFile = (req, res, next) => {
    upload.single('file')(req, res, next);
};

module.exports = uploadFile