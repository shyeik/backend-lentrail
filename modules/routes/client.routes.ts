import express from "express";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../client/client.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createClient);
router.get("/", protect, getClients);
router.put("/:id", protect, updateClient); // ✅ add protect
router.delete("/:id", protect, deleteClient);

export default router;
