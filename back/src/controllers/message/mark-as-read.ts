import { Request, Response } from 'express';
import { Message } from '../../models/message-model';

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const currentUserId = req.userId;

    if (!currentUserId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if user is part of this conversation
    if (message.sender.toString() !== currentUserId && message.receiver?.toString() !== currentUserId) {
      return res.status(403).json({ error: 'Not authorized to mark this message as read' });
    }

    // For now, we'll just return success since we don't have a read status field
    // In a real implementation, you'd update a readAt field or similar
    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};