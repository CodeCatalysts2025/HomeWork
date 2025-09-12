import { RequestHandler } from "express";
import { Admin } from "../../models";

export const CreateTeacher: RequestHandler = async (req, res) => {
  const { teacher } = req.body;
  try {
    const newTeacher = await Admin.create({
      userName: teacher.userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "admin",
    });
    res
      .status(201)
      .json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (error) {
    console.error("Create teacher error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
