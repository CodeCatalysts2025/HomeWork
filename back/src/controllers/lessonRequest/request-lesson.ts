import { RequestHandler } from "express";
import { User } from "../../models";
import lessonRequestSchema from "../../models/lesson-request.schema";

export const requestLesson: RequestHandler = async (req, res) => {
  try {
    const { teacherId } = req.body;
    const studentId = (req as any).user._id;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "admin") {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    const newRequest = new lessonRequestSchema({
      student: studentId,
      teacher: teacherId,
      status: "pending",
    });

    await newRequest.save();
    res.json({ message: "Хүсэлт илгээгдлээ", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error requesting lesson" });
  }
};
