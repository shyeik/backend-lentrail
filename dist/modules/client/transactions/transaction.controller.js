"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsByClient = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("./transaction.model"));
// CREATE
const createTransaction = async (req, res) => {
    try {
        const tx = await transaction_model_1.default.create(req.body);
        res.json(tx);
    }
    catch (err) {
        res.status(400).json({ message: "Error creating transaction" });
    }
};
exports.createTransaction = createTransaction;
// GET BY CLIENT
const getTransactionsByClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const tx = await transaction_model_1.default.find({ clientId }).sort({ createdAt: -1 });
        res.json(tx);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
};
exports.getTransactionsByClient = getTransactionsByClient;
