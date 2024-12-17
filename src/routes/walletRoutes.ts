import express from "express";
import { getWallets, createWallet, updateWallet, deleteWallet } from "../controllers/walletController";

const router = express.Router();

router.get("/", getWallets);
router.post("/", createWallet);
router.put("/:id", updateWallet);
router.delete("/:id", deleteWallet);

export default router; // Use ES module syntax
