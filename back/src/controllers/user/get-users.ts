import { RequestHandler } from "express";
import { User } from "../../models";

export const GetUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
