"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClients = exports.createClient = void 0;
const client_model_1 = __importDefault(require("./client.model"));
// CREATE
const createClient = async (req, res) => {
    try {
        const client = await client_model_1.default.create(req.body);
        res.json(client);
    }
    catch (err) {
        res.status(400).json({ message: "Error creating client" });
    }
};
exports.createClient = createClient;
// READ ALL
const getClients = async (req, res) => {
    try {
        const clients = await client_model_1.default.find();
        res.json(clients);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching clients" });
    }
};
exports.getClients = getClients;
// UPDATE
const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClient = await client_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true, // return updated data
            runValidators: true, // validate schema
        });
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.json(updatedClient);
    }
    catch (err) {
        res.status(400).json({ message: "Error updating client" });
    }
};
exports.updateClient = updateClient;
// DELETE
const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await client_model_1.default.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.json({ message: "Client deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting client" });
    }
};
exports.deleteClient = deleteClient;
