"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/routes/auth.routes"));
const client_routes_1 = __importDefault(require("./modules/routes/client.routes"));
const transaction_routes_1 = __importDefault(require("./modules/routes/transaction.routes"));
const notification_routes_1 = __importDefault(require("./modules/routes/notification.routes"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.FRONTEND_URL || "http://localhost:5173";
app.use((0, cors_1.default)({
    origin: CLIENT_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
// Connect MongoDB
(0, db_1.connectDB)();
// Health check
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Lentrail backend is running 🚀",
    });
});
// Routes
app.use("/api", auth_routes_1.default);
app.use("/api/clients", client_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
// Error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
    });
});
// Local only
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
// Required for Vercel
exports.default = app;
