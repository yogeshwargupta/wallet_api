"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWallet = exports.updateWallet = exports.createWallet = exports.getWallets = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all wallets
const getWallets = async (req, res) => {
    try {
        const wallets = await prisma.wallet.findMany();
        res.json(wallets);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving wallets" });
    }
};
exports.getWallets = getWallets;
// Create wallet
const createWallet = async (req, res) => {
    const { userId, balance } = req.body;
    try {
        const wallet = await prisma.wallet.create({
            data: { userId, balance },
        });
        res.status(201).json(wallet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating wallet" });
    }
};
exports.createWallet = createWallet;
// Update wallet
const updateWallet = async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    try {
        const updatedWallet = await prisma.wallet.update({
            where: { id },
            data: { balance },
        });
        res.json(updatedWallet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating wallet" });
    }
};
exports.updateWallet = updateWallet;
// Delete wallet
const deleteWallet = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.wallet.delete({ where: { id } });
        res.json({ message: "Wallet deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting wallet" });
    }
};
exports.deleteWallet = deleteWallet;
