import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToDataBase } from "../src/database/connect-to-db";
import userRouter from "../src/routes/user.route";
import adminRouter from "../src/routes/admin.route";
import messageRouter from "../src/routes/message.route";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/message", messageRouter);

async function startServer() {
  try {
    await connectToDataBase();
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
