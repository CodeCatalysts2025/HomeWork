import { Request, Response } from "express";
import { Message } from "../../models";
import { formatMessage } from "../../utils/get-messages.formatting";
import { Types } from "mongoose";

export const getMessagesBetweenUsers = async (req: Request, res: Response) => {
  try {
    const { userId1, userId2 } = req.params;
    
    // Validate ObjectIds
    if (!Types.ObjectId.isValid(userId1) || !Types.ObjectId.isValid(userId2)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }
    
    const messages = await Message.find({
      $or: [
        { sender: new Types.ObjectId(userId1), receiver: new Types.ObjectId(userId2) },
        { sender: new Types.ObjectId(userId2), receiver: new Types.ObjectId(userId1) },
      ],
    })
      .populate("sender", "email password createdAt updatedAt")
      .populate("receiver", "email password createdAt updatedAt")
      .sort({ createdAt: -1 })
      .exec();

    console.log(`Found ${messages.length} messages between users ${userId1} and ${userId2}`);
    
    res.status(200).json({
      success: true,
      data: messages.map(formatMessage)
    });
  } catch (error) {
    console.error("Error in getMessagesBetweenUsers:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch messages"
    });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .populate("sender", "email password createdAt updatedAt")
      .populate("receiver", "email password createdAt updatedAt")
      .sort({ createdAt: -1 })
      .exec();

    console.log(`Total messages in database: ${messages.length}`);
    
    res.status(200).json({
      success: true,
      data: messages.map(formatMessage),
      count: messages.length
    });
  } catch (error) {
    console.error("Error in getAllMessages:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch messages"
    });
  }
};
