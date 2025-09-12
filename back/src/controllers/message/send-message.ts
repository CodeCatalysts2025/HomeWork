import { Request, Response } from 'express';
import { Message as MessageModel, User as UserModel } from '../../models';
import { Types } from 'mongoose';

// Helper function to validate ObjectIds
const validateObjectIds = (senderId: string, receiverId: string): void => {
  if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(receiverId)) {
    throw new Error("Cannot send message: Invalid senderId or receiverId");
  }
};

// Helper function to fetch users
const fetchUsers = async (senderId: string, receiverId: string) => {
  const [sender, receiver] = await Promise.all([
    UserModel.findById(senderId),
    UserModel.findById(receiverId)
  ]);

  if (!sender || !receiver) {
    throw new Error("Cannot send message: Sender or receiver not found");
  }

  return { sender, receiver };
};

// Helper function to safely convert date to ISO string
const safeDateToISO = (date: Date | null | undefined): string => {
  return date?.toISOString() || new Date().toISOString();
};

// Helper function to create user object
const createUserObject = (user: any) => ({
  id: user._id.toString(),
  email: user.email || '',
  password: user.password || '',
  createdAt: safeDateToISO(user.createdAt),
  updatedAt: safeDateToISO(user.updatedAt),
});

// Helper function to create message output
const createMessageOutput = (message: any, sender: any, receiver: any) => ({
  id: message._id.toString(),
  content: message.content || '',
  createdAt: message.createdAt.toISOString(),
  sender: createUserObject(sender),
  receiver: createUserObject(receiver),
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate ObjectIds
    validateObjectIds(senderId, receiverId);

    // Fetch sender/receiver
    const { sender, receiver } = await fetchUsers(senderId, receiverId);

    // Create message
    const message = await MessageModel.create({ sender: senderId, receiver: receiverId, content });
    
    // Create response
    const output = createMessageOutput(message, sender, receiver);

    res.status(201).json({
      success: true,
      data: output
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};