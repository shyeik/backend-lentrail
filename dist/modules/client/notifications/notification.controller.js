"use strict";
// src/controllers/notification.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllAsRead = exports.markAsRead = exports.getNotifications = exports.generateNotifications = void 0;
const notification_model_1 = __importDefault(require("./notification.model"));
const client_model_1 = __importDefault(require("../client.model"));
const transaction_model_1 = __importDefault(require("../transactions/transaction.model"));
// ===== HELPERS =====
const calculateTotalMonths = (start, end) => {
    if (!start || !end)
        return 0;
    let months = (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    if (end.getDate() >= start.getDate())
        months += 1;
    return Math.max(0, months);
};
const calculateMonthsPaid = (start) => {
    if (!start)
        return 0;
    const today = new Date();
    let months = (today.getFullYear() - start.getFullYear()) * 12 +
        (today.getMonth() - start.getMonth());
    if (today.getDate() >= start.getDate())
        months += 1;
    return Math.max(0, months);
};
const getLoanStatus = (transactions) => {
    const sorted = [...transactions].sort((a, b) => new Date(a.dateOfLoan).getTime() - new Date(b.dateOfLoan).getTime());
    let cycleTotalMonths = 0;
    let cycleStartDate;
    let latestChange = 0;
    sorted.forEach((t) => {
        const dateBased = calculateTotalMonths(t.startMonth, t.endMonth);
        const base = Number(t.loanTerm || 0) || Number(t.totalMonths || 0) || dateBased;
        const ext = Number(t.extensionMonths || 0) || Number(t.totalMonths || 0) || dateBased;
        if (t.loanType === "NEW" || t.loanType === "RENEWAL") {
            cycleStartDate = t.startMonth;
            cycleTotalMonths = base;
        }
        if (t.loanType === "EXTENSION") {
            cycleTotalMonths += ext;
        }
        latestChange = Number(t.change || 0);
    });
    const monthsPaid = Math.min(calculateMonthsPaid(cycleStartDate), cycleTotalMonths);
    return {
        canRenew: cycleTotalMonths > 0 && monthsPaid >= cycleTotalMonths / 2,
        canExtend: cycleTotalMonths > 0 && monthsPaid >= 3,
        canSukli: latestChange >= 1000,
    };
};
// ===== CONTROLLERS =====
// 🔥 Generate notifications
const generateNotifications = async (_req, res) => {
    try {
        const clients = await client_model_1.default.find();
        for (const client of clients) {
            const transactions = await transaction_model_1.default.find({
                clientId: client._id,
            });
            const status = getLoanStatus(transactions);
            const name = `${client.lastName}, ${client.firstName}`;
            const notifications = [];
            if (status.canRenew) {
                notifications.push({
                    clientId: client._id,
                    type: "RENEWAL",
                    message: `${name} is available for Renewal`,
                });
            }
            if (status.canExtend) {
                notifications.push({
                    clientId: client._id,
                    type: "EXTENSION",
                    message: `${name} is available for Extension`,
                });
            }
            if (status.canSukli) {
                notifications.push({
                    clientId: client._id,
                    type: "SUKLILOAN",
                    message: `${name} is available for Sukli Loan`,
                });
            }
            for (const notif of notifications) {
                await notification_model_1.default.updateOne({
                    clientId: notif.clientId,
                    type: notif.type,
                }, { $setOnInsert: notif }, { upsert: true });
            }
        }
        res.json({ message: "Notifications generated" });
    }
    catch (err) {
        res.status(500).json({ message: "Error generating notifications" });
    }
};
exports.generateNotifications = generateNotifications;
// 📥 Get notifications
const getNotifications = async (_req, res) => {
    try {
        const data = await notification_model_1.default.find()
            .populate("clientId")
            .sort({ createdAt: -1 });
        res.json(data);
    }
    catch {
        res.status(500).json({ message: "Error fetching notifications" });
    }
};
exports.getNotifications = getNotifications;
// ✅ Mark one read
const markAsRead = async (req, res) => {
    try {
        const notif = await notification_model_1.default.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.json(notif);
    }
    catch {
        res.status(500).json({ message: "Error updating notification" });
    }
};
exports.markAsRead = markAsRead;
// ✅ Mark all read
const markAllAsRead = async (_req, res) => {
    try {
        await notification_model_1.default.updateMany({ isRead: false }, { isRead: true });
        res.json({ message: "All marked as read" });
    }
    catch {
        res.status(500).json({ message: "Error updating notifications" });
    }
};
exports.markAllAsRead = markAllAsRead;
