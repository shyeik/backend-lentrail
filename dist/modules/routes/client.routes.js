"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../client/client.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.protect, client_controller_1.createClient);
router.get("/", auth_1.protect, client_controller_1.getClients);
router.put("/:id", auth_1.protect, client_controller_1.updateClient); // ✅ add protect
router.delete("/:id", auth_1.protect, client_controller_1.deleteClient);
exports.default = router;
