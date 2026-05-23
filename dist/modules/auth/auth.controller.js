"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await (0, auth_service_1.registerUser)(username, password);
        return res.status(201).json(data);
    }
    catch (err) {
        return res.status(400).json({
            message: err.message || "Registration failed",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await (0, auth_service_1.loginUser)(username, password);
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(400).json({
            message: err.message || "Login failed",
        });
    }
};
exports.login = login;
