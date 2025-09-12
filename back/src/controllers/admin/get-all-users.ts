import { User } from "../../models";
import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
