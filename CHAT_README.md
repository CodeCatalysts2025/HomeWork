# Peer-to-Peer Chat System

This document describes the chat functionality implemented for the Peer2Peer learning platform, allowing students to communicate with each other directly.

## Features

### Backend (Node.js + Express + MongoDB)

#### Message Model (`message-model.ts`)
- **Full message schema** with sender, receiver, content, timestamps
- **Message types**: text, image, file, system
- **Read status tracking** with timestamps
- **Soft delete** functionality
- **Reply system** for threaded conversations
- **File attachments** support
- **Optimized indexes** for performance

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/message/send` | Send a new message |
| GET | `/message/conversations` | Get all conversations for current user |
| GET | `/message/conversation/:userId` | Get conversation with specific user |
| PATCH | `/message/read/:messageId` | Mark specific message as read |
| PATCH | `/message/conversation/:userId/read` | Mark entire conversation as read |
| DELETE | `/message/:messageId` | Delete a message (soft delete) |

#### Controllers
- `send-message.ts` - Handle message creation
- `get-conversation.ts` - Retrieve conversation between two users
- `get-conversations.ts` - Get all user conversations with last message
- `mark-as-read.ts` - Handle read status updates
- `delete-message.ts` - Handle message deletion

### Frontend (Next.js + React + TypeScript)

#### Chat Interface (`chat-interface.tsx`)
- **Real-time chat UI** with message bubbles
- **Conversation list** with unread counts
- **User avatars and levels** display
- **Message timestamps** and read status
- **Responsive design** for mobile and desktop
- **Typing indicators** and loading states

#### Chat Page (`/chat`)
- **Full chat interface** integration
- **Online users list** sidebar
- **Quick actions** for study groups
- **Modern UI** with shadcn/ui components

## Database Schema

### Message Collection
```typescript
{
  sender: ObjectId (ref: User),
  receiver: ObjectId (ref: User),
  content: String (max 2000 chars),
  messageType: Enum ['text', 'image', 'file', 'system'],
  isRead: Boolean,
  readAt: Date,
  createdAt: Date,
  updatedAt: Date,
  replyTo: ObjectId (ref: Message),
  isDeleted: Boolean,
  deletedAt: Date,
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String
  }]
}
```

## Usage Examples

### Sending a Message
```typescript
const messageData = {
  sender: "current-user-id",
  receiver: "target-user-id",
  content: "Hello! How are you?",
  messageType: "text"
}

const response = await fetch('/api/message/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(messageData)
})
```

### Getting Conversations
```typescript
const response = await fetch('/api/message/conversations', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
const conversations = await response.json()
```

### Getting Specific Conversation
```typescript
const response = await fetch(`/api/message/conversation/${userId}?limit=50&skip=0`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
const conversation = await response.json()
```

## Key Features

### 1. Real-time Communication
- Students can send messages to each other instantly
- Message status tracking (sent, delivered, read)
- Typing indicators and online status

### 2. User Experience
- Clean, modern chat interface
- Mobile-responsive design
- Unread message counts
- Conversation history
- User avatars and levels display

### 3. Performance Optimizations
- Database indexes for fast queries
- Pagination for large conversations
- Efficient aggregation for conversation lists
- Soft delete to preserve data integrity

### 4. Security
- Authentication required for all endpoints
- Users can only access their own messages
- Input validation and sanitization
- File upload security (when implemented)

## Integration with Existing System

The chat system integrates seamlessly with the existing Peer2Peer platform:

- **User System**: Uses existing user authentication and profiles
- **Navigation**: Added chat link to main navigation
- **UI Components**: Uses existing shadcn/ui component library
- **Styling**: Consistent with platform design system

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for instant messaging
2. **File Sharing**: Upload and share images, documents
3. **Group Chats**: Multi-user conversations
4. **Message Reactions**: Emoji reactions to messages
5. **Voice Messages**: Audio message support
6. **Message Search**: Search through conversation history
7. **Push Notifications**: Mobile notifications for new messages

## Setup Instructions

1. **Backend**: The message routes are already integrated into the main API
2. **Frontend**: Navigate to `/chat` to access the chat interface
3. **Database**: The Message model will be created automatically when first used

## API Documentation

### Authentication
All endpoints require authentication via Bearer token in the Authorization header.

### Error Handling
All endpoints return consistent error responses:
```json
{
  "error": "Error message",
  "success": false
}
```

### Success Responses
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

This chat system provides a solid foundation for peer-to-peer communication in the learning platform, enabling students to collaborate, ask questions, and learn together effectively.