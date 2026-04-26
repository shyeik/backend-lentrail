// auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./auth.model";

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  // 🔥 LOG RESULT
  console.log("FOUND USER:", user);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

  // 🔥 LOG RESULT
  console.log("GENERATED TOKEN:", token);

  return { token };
};

export const registerUser = async (username: string, password: string) => {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  return user;
};
