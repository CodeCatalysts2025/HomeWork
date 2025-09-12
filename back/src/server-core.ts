import dotenv from 'dotenv';
dotenv.config();

import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer, DefaultEventsMap, Socket } from 'socket.io';
import mongoose from 'mongoose';
import { Message } from './models/message-model';

export const userSockets = new Map<string, string>();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app';
const SOCKET_PORT = process.env.SOCKET_PORT || 4300;

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB-тай холбогдлоо');
    } catch (error) {
        console.error('❌ MongoDB холболтын алдаа:', error);
        throw error;
    }
};

export let httpServer: HttpServer;
export let io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>;

// Socket event handlers
const handleRegister = (socket: Socket, userId: string) => {
    userSockets.set(userId, socket.id);
    console.log(`Хэрэглэгч бүртгэгдлээ: ${userId}, Socket ID: ${socket.id}`);
};

const handleMessage = async (socket: Socket, msg: { content: string; sender: { id: string }; receiver: { id: string } }) => {
    try {
        const messageWithId = { ...msg, id: new mongoose.Types.ObjectId().toString() };
        await Message.create({ content: msg.content, senderId: msg.sender.id, receiverId: msg.receiver.id });
        const receiverSocketId = userSockets.get(msg.receiver.id);
        if (receiverSocketId) io.to(receiverSocketId).emit('newMessage', messageWithId);
        io.to(socket.id).emit('newMessage', messageWithId);
    } catch (error) {
        console.error('Мессеж хадгалахад алдаа гарлаа:', error);
    }
};

const handleDisconnect = (socket: Socket) => {
    console.log('Хэрэглэгч саллаа:', socket.id);
    for (const [userId, socketId] of userSockets) {
        if (socketId === socket.id) { userSockets.delete(userId); break; }
    }
};

const handleServerError = (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${SOCKET_PORT} is already in use. Socket.IO server may already be running.`);
    } else {
        console.error('❌ Socket.IO server error:', error);
    }
};

const handleServerStart = () => {
    console.log(`✅ Socket.IO сервер http://localhost:${SOCKET_PORT} дээр ажиллаж байна`);
    console.log(`📡 Server ready for WebSocket connections`);
};

const setupSocketEvents = (socket: Socket) => {
    console.log('Хэрэглэгч холбогдлоо:', socket.id);
    socket.on('register', (userId: string) => handleRegister(socket, userId));
    socket.on('message', (msg: { content: string; sender: { id: string }; receiver: { id: string } }) => handleMessage(socket, msg));
    socket.on('disconnect', () => handleDisconnect(socket));
};

const createSocketServer = (expressApp?: any) => {
    httpServer = createServer(expressApp);
    io = new SocketIOServer(httpServer, {
        cors: { origin: ['http://localhost:4201', 'http://localhost:3000'], methods: ['GET', 'POST'], credentials: true }
    });
    console.log('Socket.IO server created successfully');
};

const setupServerListeners = () => {
    io.on('connection', setupSocketEvents);
    httpServer.on('error', handleServerError);
};

// Initialize server
const initializeSocketServer = async (expressApp?: any) => {
    try {
        if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
            console.log('Skipping Socket.IO server initialization in test environment');
            return;
        }

        if (httpServer && io) {
            console.log('Socket.IO server is already running');
            return;
        }

        console.log('Initializing Socket.IO server...');
        createSocketServer(expressApp);
        setupServerListeners();
    } catch (error) {
        console.error('❌ Серверийг эхлүүлэхэд алдаа гарлаа:', error);
    }
};

// Export the initialization function
export { initializeSocketServer, connectToMongoDB };