import express from "express";
import authRoutes from "./modules/routes/auth.routes";
import clientRoutes from "./modules/routes/client.routes";
import transactionRoutes from "./modules/routes/transaction.routes";
import notificationRoutes from "./modules/routes/notification.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
//roustes

app.use("/api", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);
export default app;
