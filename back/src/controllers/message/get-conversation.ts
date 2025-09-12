import { Request, Response } from 'express';
import { Message } from '../../models/message-model';

export const getConversation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    if (!currentUserId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let query;
    let countQuery;

    // Check if this is a general chat request
    if (userId === 'general') {
      query = { isGeneralChat: true };
      countQuery = { isGeneralChat: true };
    } else {
      // Regular conversation between two users
      query = {
        $or: [
          { sender: currentUserId, receiver: userId },
          { sender: userId, receiver: currentUserId }
        ],
        isGeneralChat: { $ne: true }
      };
      countQuery = {
        $or: [
          { sender: currentUserId, receiver: userId },
          { sender: userId, receiver: currentUserId }
        ],
        isGeneralChat: { $ne: true }
      };
    }

    // Get messages
    const messages = await Message.find(query)
      .populate('sender', 'username avatar level')
      .populate('receiver', 'username avatar level')
      .sort({ createdAt: -1 })
      .limit(limitNum * 1)
      .skip((pageNum - 1) * limitNum);

    // Reverse to show oldest first
    const reversedMessages = messages.reverse();

    res.json({
      success: true,
      messages: reversedMessages,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: await Message.countDocuments(countQuery)
      }
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};