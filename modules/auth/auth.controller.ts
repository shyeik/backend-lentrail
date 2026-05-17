import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const data = await registerUser(username, password);

    return res.status(201).json(data);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const data = await loginUser(username, password);

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Login failed",
    });
  }
};
