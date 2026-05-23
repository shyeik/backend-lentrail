"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const protect = (req, res, next) => {
    try {
        // 🔥 get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        // format: Bearer TOKEN
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        // 🔥 verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        // save user info sa request
        req.user = decoded;
        next(); // proceed sa next route
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.protect = protect;
