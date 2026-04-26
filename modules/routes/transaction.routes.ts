import express from "express";
import {
  createTransaction,
  getTransactionsByClient,
} from "../client/transactions/transaction.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/:clientId", protect, getTransactionsByClient);

export default router;
