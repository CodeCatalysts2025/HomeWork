import { Request, Response } from 'express';
import { Message } from '../../models/message-model';

export const getConversations = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.userId;

    if (!currentUserId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Get all unique conversations for the current user
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: currentUserId },
            { receiver: currentUserId },
            { isGeneralChat: true } // Include general chat messages
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$isGeneralChat', true] },
              'general',
              {
                $cond: [
                  { $eq: ['$sender', currentUserId] },
                  '$receiver',
                  '$sender'
                ]
              }
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          user: {
            $cond: [
              { $eq: ['$_id', 'general'] },
              [{ username: 'General Chat', avatar: null, level: 0 }],
              '$user'
            ]
          }
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userId: '$_id',
          username: '$user.username',
          avatar: '$user.avatar',
          level: '$user.level',
          isGeneralChat: { $eq: ['$_id', 'general'] },
          lastMessage: {
            id: '$lastMessage._id',
            content: '$lastMessage.content',
            createdAt: '$lastMessage.createdAt'
          }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    res.json({
      success: true,
      conversations
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};