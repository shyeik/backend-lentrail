import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./modules/routes/auth.routes";
import clientRoutes from "./modules/routes/client.routes";
import transactionRoutes from "./modules/routes/transaction.routes";
import notificationRoutes from "./modules/routes/notification.routes";

import { connectDB } from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.FRONTEND_URL || "http://localhost:5173";

// Connect MongoDB
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log("📦 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Lentrail backend running 🚀",
    mongodb:
      mongoose.connection.readyState === 1
        ? "✅ Connected"
        : "❌ Not Connected",
  });
});

app.use("/api", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
