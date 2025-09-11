import { RequestHandler } from "express";
import { User } from "../../models";

export const GetUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
