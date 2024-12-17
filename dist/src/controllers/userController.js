"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
// Create user
const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await prisma.user.create({ data: { username, email } });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
};
exports.createUser = createUser;
// Update user
const updateUser = async (req, res) => {
    const { id } = req.params; // 'id' is a string
    const { username, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: id }, // id is a string for MongoDB
            data: { username, email },
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update user" });
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res) => {
    const { id } = req.params; // 'id' is a string
    try {
        await prisma.user.delete({ where: { id: id } });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete user" });
    }
};
exports.deleteUser = deleteUser;
