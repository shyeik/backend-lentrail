import { Request, Response } from "express";
import Transaction from "./transaction.model";

// CREATE
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const tx = await Transaction.create(req.body);
    res.json(tx);
  } catch (err) {
    res.status(400).json({ message: "Error creating transaction" });
  }
};

// GET BY CLIENT
export const getTransactionsByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const tx = await Transaction.find({ clientId }).sort({ createdAt: -1 });

    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
