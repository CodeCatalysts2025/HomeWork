import { Router } from 'express';
import { sendMessage } from '../controllers/message/send-message';
import { getMessages, getMessagesBetweenUsers, getMessage } from '../controllers/message/get-messages-between';
import { getAllMessages } from '../controllers/message/get-all-messages';

const router = Router();

// Send a message
router.post('/send', sendMessage);

// Get messages with optional filtering
router.get('/', getMessages);

// Get messages between two specific users
router.get('/between/:userId1/:userId2', getMessagesBetweenUsers);


// Get all messages (for debugging)
router.get('/all', getAllMessages);

// Get a specific message by ID
router.get('/:id', getMessage);

export default router;