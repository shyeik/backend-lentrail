"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    lastName: String,
    firstName: String,
    middleName: String,
    suffix: String,
    birthday: Date,
    age: Number,
    pensionType: String,
    loanType: String,
    pensionAmount: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Client", clientSchema);
