import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, email } });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; // 'id' is a string
  const { username, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: id }, // id is a string for MongoDB
      data: { username, email },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params; // 'id' is a string

  try {
    await prisma.user.delete({ where: { id: id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};