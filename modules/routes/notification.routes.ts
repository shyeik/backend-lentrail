// src/routes/notification.routes.ts

import express from "express";
import {
  generateNotifications,
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../client/notifications/notification.controller";

const router = express.Router();

router.post("/generate", generateNotifications);
router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);
router.patch("/mark/all-read", markAllAsRead);

export default router;
