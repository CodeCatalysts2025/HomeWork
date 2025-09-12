import { connect } from "mongoose";

export const connectToDataBase = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
  }
  try {
    await connect(mongoUrl);
    console.log("✅ Connected to MongoDB database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
