"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.createTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create transaction
const createTransaction = async (req, res) => {
    const { walletId, amount, type, category } = req.body;
    try {
        const transaction = await prisma.transaction.create({
            data: {
                walletId,
                amount,
                type,
                category,
            },
        });
        res.json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating transaction" });
    }
};
exports.createTransaction = createTransaction;
// Delete transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await prisma.transaction.delete({
            where: { id },
        });
        res.json({ message: "Transaction deleted", transaction });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting transaction" });
    }
};
exports.deleteTransaction = deleteTransaction;
