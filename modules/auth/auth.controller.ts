// auth.controller.ts
import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await loginUser(username, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await registerUser(username, password);

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
