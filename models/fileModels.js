const prisma = require('../config/db');

async function getFileById(id) {
    const file = await prisma.file.findUnique({
        where: { id: id },
    });

    return file;
};

async function createNewFile(fileName, path, cloudId, size, folderId) {
    await prisma.file.create({
        data: {
            fileName: fileName,
            path: path,
            cloudinaryId: cloudId,
            size: size,
            folderId: folderId,
        },
    });
};

async function updateFileById(fileName, id) {
    await prisma.file.update({
        where: { id: id },
        data: {
            fileName: fileName,
        },
    });
};

async function deleteFileById(id) {
    await prisma.file.delete({
        where: { id: id },
    });
};

module.exports = {
    getFileById,
    createNewFile,
    updateFileById,
    deleteFileById,
};