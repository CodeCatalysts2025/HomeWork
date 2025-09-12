import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { initializeSocketServer, connectToMongoDB, httpServer, io, userSockets } from './server-core';
import { isServerReady, getServerStatus, closeServer } from './server-utils';
import userRouter from './routes/user.route';
import messageRouter from './routes/message.route';

const app = express();

// Setup Express middleware
const setupExpressMiddleware = () => {
  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4201',
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true
  }));
  app.use(json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json(getServerStatus());
  });

  // API routes
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      ...getServerStatus()
    });
  });

  // Message and User routes
  app.use('/user', userRouter);
  app.use('/message', messageRouter);
};

// Setup graceful shutdown handlers
const setupGracefulShutdown = () => {
  const shutdownHandler = async (signal: string) => {
    console.log(`${signal} received, shutting down gracefully`);
    await closeServer();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
  process.on('SIGINT', () => shutdownHandler('SIGINT'));
};

// Start server function
const startServer = async () => {
  try {
    await connectToMongoDB();
    setupExpressMiddleware();
    await initializeSocketServer(app);
    setupGracefulShutdown();
    
    const port = process.env.PORT || 3001;
    httpServer.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📡 Socket.IO server ready for connections`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
setTimeout(startServer, 1000);

export { httpServer, io, userSockets, isServerReady, getServerStatus, closeServer }; 