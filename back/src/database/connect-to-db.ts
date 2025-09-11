import { connect } from "mongoose";

export const connectToDataBase = async () => {
  try {
    await connect(
      "mongodb+srv://codecatalysts2025_db_user:CodeC%40t%40lysts2025@cluster0.zqrxblc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Connected to MongoDB database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
