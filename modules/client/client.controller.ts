import { Request, Response } from "express";
import Client from "./client.model";

// CREATE
export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: "Error creating client" });
  }
};

// READ ALL
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching clients" });
  }
};

// UPDATE
export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true, // return updated data
      runValidators: true, // validate schema
    });

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: "Error updating client" });
  }
};

// DELETE
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting client" });
  }
};
