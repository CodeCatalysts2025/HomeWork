import { Types } from "mongoose";
import { Request, Response } from "express";
import { Message } from "../../models";
import { formatMessage } from "../../utils/get-messages.formatting";
import { validateObjectId, validateUserIds } from "../../utils/get-messages.validation";
import { ERRORS } from "../../types/get-messages.types";

const buildFilter = (senderId?: string, receiverId?: string) => {
  // If both senderId and receiverId are provided, get messages between these two users
  if (senderId && receiverId) {
    return {
      $or: [
        { sender: new Types.ObjectId(senderId), receiver: new Types.ObjectId(receiverId) },
        { sender: new Types.ObjectId(receiverId), receiver: new Types.ObjectId(senderId) }
      ]
    };
  }
  
  // If only one ID is provided, filter by that field
  const filter: Record<string, Types.ObjectId> = {};
  if (senderId) filter.sender = new Types.ObjectId(senderId);
  if (receiverId) filter.receiver = new Types.ObjectId(receiverId);
  return filter;
};

const fetchMessages = async (senderId?: string, receiverId?: string) => {
  const filter = buildFilter(senderId, receiverId);
  console.log(`[DEBUG] fetchMessages filter:`, JSON.stringify(filter, null, 2));
  
  const messages = await Message.find(filter)
    .populate("sender", "email password createdAt updatedAt")
    .populate("receiver", "email password createdAt updatedAt")
    .sort({ createdAt: -1 })
    .exec();

  console.log(`[DEBUG] Raw messages from DB:`, messages.length);
  if (messages.length > 0) {
    console.log(`[DEBUG] First message:`, JSON.stringify(messages[0], null, 2));
  }

  return messages.map(formatMessage);
};

const fetchMessageById = async (id: string) => {
  const message = await Message.findById(id)
    .populate("sender", "email password createdAt updatedAt")
    .populate("receiver", "email password createdAt updatedAt")
    .exec();

  if (!message) {
    throw new Error(ERRORS.MESSAGE_NOT_FOUND);
  }
  return formatMessage(message);
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.query;
    
    validateUserIds(senderId as string, receiverId as string);
    
    const messages = await fetchMessages(senderId as string, receiverId as string);
    
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error("Unexpected error in getMessages:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : ERRORS.FETCH_FAILED
    });
  }
};

export const getMessagesBetweenUsers = async (req: Request, res: Response) => {
  try {
    const { userId1, userId2 } = req.params;
    
    console.log(`[DEBUG] getMessagesBetweenUsers called with userId1: ${userId1}, userId2: ${userId2}`);
    
    validateObjectId(userId1);
    validateObjectId(userId2);
    
    console.log(`[DEBUG] Validation passed for both user IDs`);
    
    const messages = await fetchMessages(userId1, userId2);
    
    console.log(`[DEBUG] Found ${messages.length} messages between users ${userId1} and ${userId2}`);
    
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error("Unexpected error in getMessagesBetweenUsers:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : ERRORS.FETCH_FAILED
    });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    validateObjectId(id);
    
    const message = await fetchMessageById(id);
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error("Unexpected error in getMessage:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : ERRORS.FETCH_FAILED
    });
  }
};
