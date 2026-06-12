const prisma = require('../config/db');

async function getFolderById(id) {
    const folder = await prisma.folder.findUnique({
        where: { id: id },
        include: {
            files: true,
        },
    });

    return folder;
};

async function createNewFolder(name, userId) {
    await prisma.folder.create({
        data: {
            name: name,
            userId: userId
        },
    });
};

async function updateFolderById(name, id) {
    await prisma.folder.update({
        where: { id: id },
        data: {
            name: name,
        },
    });
};

async function deleteFolderById(id) {
    await prisma.folder.delete({
        where: { id: id },
    });
};

module.exports = {
    getFolderById,
    createNewFolder,
    updateFolderById,
    deleteFolderById,
};