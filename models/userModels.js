const prisma = require('../config/db');

async function getUserByName(username) {
    const user = await prisma.user.findUnique({
        where: { username: username },
    });

    if(!user) {
        return null;
    };

    return user;
};

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    if(!user) {
        return null
    };

    return user;
};

async function createUser(username, password) {
    await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
};

async function updateUserById(username, password, id) {
    await prisma.user.update({
        where: { id: id },
        data: {
            username: username,
            password: password,
        },
    });
};

async function deleteUserById(id) {
    await prisma.user.delete({
        where: { id: id },
    });
};

module.exports = {
    getUserByName,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
}