import { RequestHandler } from "express";
import { User } from "../../models";

export const CreateUser: RequestHandler = async (req, res) => {
  const { user } = req.body;
  try {
    const newUser = await User.create({
      userName: user.userName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
