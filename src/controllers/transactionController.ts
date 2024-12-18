import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
  const { walletId, amount, type, description } = req.body;  // Include description and type

  try {
    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        amount,
        type,       // 'type' field now exists in the model
        description, // Added description field here as well
      },
    });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

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
