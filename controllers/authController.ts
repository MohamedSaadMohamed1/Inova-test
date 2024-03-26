import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/User";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET: string = process.env.JWT_ACCESS_TOKEN_SECRET_KEY || "";

export async function register(req: Request, res: Response) {
  const { fname, lname, email, password, userType } = req.body;

  try {
    const existingUser: UserDocument | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: UserDocument = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    const token: string = jwt.sign({ email: newUser.email, userId: newUser._id }, JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_AT || "1h",
    });

    res.status(201).json({ status: "ok", data: token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
  const { email, password } = req.body;
  try {
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token: string = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, {
      expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRE_AT || "15m",
    });

    res.status(200).json({ status: "ok", data: token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {

};

export const resetPasswordPost = async (req: Request, res: Response): Promise<void> => {

};
