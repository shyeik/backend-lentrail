"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("./auth.model"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
}
const registerUser = async (username, password) => {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    const existingUser = await auth_model_1.default.findOne({
        username: cleanUsername,
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(cleanPassword, 10);
    const user = await auth_model_1.default.create({
        username: cleanUsername,
        password: hashedPassword,
    });
    return {
        message: "User registered successfully",
        user,
    };
};
exports.registerUser = registerUser;
// 🔥 PUT DEBUG VERSION HERE
const loginUser = async (username, password) => {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    const user = await auth_model_1.default.findOne({
        username: cleanUsername,
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcryptjs_1.default.compare(cleanPassword, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return {
        message: "Login successful",
        token,
    };
};
exports.loginUser = loginUser;
