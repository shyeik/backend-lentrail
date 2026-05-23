"use strict";
// src/routes/notification.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../client/notifications/notification.controller");
const router = express_1.default.Router();
router.post("/generate", notification_controller_1.generateNotifications);
router.get("/", notification_controller_1.getNotifications);
router.patch("/:id/read", notification_controller_1.markAsRead);
router.patch("/mark/all-read", notification_controller_1.markAllAsRead);
exports.default = router;
