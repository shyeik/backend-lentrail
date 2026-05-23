"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../client/transactions/transaction.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.protect, transaction_controller_1.createTransaction);
router.get("/:clientId", auth_1.protect, transaction_controller_1.getTransactionsByClient);
exports.default = router;
