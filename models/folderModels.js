const prisma = require('../config/db');

async function createNewFolder(name, userId) {
    await prisma.folder.create({
        data: {
            name: name,
            userId: userId
        },
    });
};

module.exports = {
    createNewFolder,
}