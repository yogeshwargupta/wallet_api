import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all wallets
export const getWallets = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallets = await prisma.wallet.findMany();
    res.json(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving wallets" });
  }
};

// Create wallet
export const createWallet = async (req: Request, res: Response): Promise<void> => {
  const { userId, balance } = req.body;

  try {
    const wallet = await prisma.wallet.create({
      data: { userId, balance },
    });
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating wallet" });
  }
};

// Update wallet
export const updateWallet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    const updatedWallet = await prisma.wallet.update({
      where: { id },
      data: { balance },
    });
    res.json(updatedWallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating wallet" });
  }
};

// Delete wallet
export const deleteWallet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.wallet.delete({ where: { id } });
    res.json({ message: "Wallet deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting wallet" });
  }
};
