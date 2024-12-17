import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create transaction
export const createTransaction = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

// Delete transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.delete({
      where: { id },
    });
    res.json({ message: "Transaction deleted", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting transaction" });
  }
};
