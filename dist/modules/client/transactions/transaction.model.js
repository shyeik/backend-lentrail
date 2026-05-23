"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    dateOfLoan: { type: Date, required: true },
    loanType: {
        type: String,
        enum: ["NEW", "RENEWAL", "EXTENSION", "SUKLILOAN"],
        required: true,
    },
    dsbNumber: { type: String },
    startMonth: { type: Date },
    endMonth: { type: Date },
    pension: { type: Number, default: 0 },
    monthlyAmort: { type: Number, default: 0 },
    change: { type: Number, default: 0 },
    // For NEW and RENEWAL
    loanTerm: { type: Number, default: 0 },
    // For EXTENSION
    extensionMonths: { type: Number, default: 0 },
    // Optional: saved final total after computation
    totalMonths: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transaction", transactionSchema);
