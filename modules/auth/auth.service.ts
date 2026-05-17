import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./auth.model";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

export const registerUser = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  const existingUser = await User.findOne({
    username: cleanUsername,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(cleanPassword, 10);

  const user = await User.create({
    username: cleanUsername,
    password: hashedPassword,
  });

  return {
    message: "User registered successfully",
    user,
  };
};

// 🔥 PUT DEBUG VERSION HERE
export const loginUser = async (username: string, password: string) => {
  console.log("RAW USERNAME:", username);
  console.log("RAW PASSWORD:", password);

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  console.log("CLEAN USERNAME:", cleanUsername);
  console.log("CLEAN PASSWORD:", cleanPassword);

  const user = await User.findOne({
    username: cleanUsername,
  });

  console.log("FOUND USER:", user);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  console.log("HASH FROM DB:", user.password);

  const isMatch = await bcrypt.compare(cleanPassword, user.password);

  console.log("PASSWORD MATCH:", isMatch);

  const manualTest = await bcrypt.compare("admin12345", user.password);

  console.log("MANUAL TEST:", manualTest);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    message: "Login successful",
    token,
  };
};
