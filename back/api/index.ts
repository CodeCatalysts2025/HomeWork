import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToDataBase } from "../src/database/connect-to-db";
import userRouter from "../src/routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Peer2Peer API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/user", userRouter);

// Initialize database connection (non-blocking)
connectToDataBase().catch(console.error);

// Export the app for Vercel serverless functions
export default app;
