import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import authRoutes from "./modules/routes/auth.routes";
import clientRoutes from "./modules/routes/client.routes";
import transactionRoutes from "./modules/routes/transaction.routes";
import notificationRoutes from "./modules/routes/notification.routes";

import { connectDB } from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

// Connect MongoDB
connectDB();

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Lentrail backend is running 🚀",
  });
});

// Routes
app.use("/api", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
export default app;
