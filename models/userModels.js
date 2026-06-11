const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

async function getUserByName(username) {
    const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
            folders: true,
        },
    });

    return user;
};

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            folders: true,
        },
    });

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