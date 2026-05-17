import express from "express";
import authRoutes from "./modules/routes/auth.routes";
import clientRoutes from "./modules/routes/client.routes";
import transactionRoutes from "./modules/routes/transaction.routes";
import notificationRoutes from "./modules/routes/notification.routes";
import cors from "cors";

const app = express();

app.use(express.json());

const allowedOrigins = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/api", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
