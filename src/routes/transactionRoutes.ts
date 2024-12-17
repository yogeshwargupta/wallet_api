import express from "express";
import { createTransaction, deleteTransaction} from "../controllers/transactionController";

const router = express.Router();

router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router; // Use ES module syntax
