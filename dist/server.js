"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/routes/auth.routes"));
const client_routes_1 = __importDefault(require("./modules/routes/client.routes"));
const transaction_routes_1 = __importDefault(require("./modules/routes/transaction.routes"));
const notification_routes_1 = __importDefault(require("./modules/routes/notification.routes"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
(0, db_1.connectDB)();
app.get("/", (_req, res) => {
    res.send("Lentrail Backend API is running");
});
app.use("/api", auth_routes_1.default);
app.use("/api/clients", client_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
exports.default = app;
