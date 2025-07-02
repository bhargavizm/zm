// lib/db.js
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return; // already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "zmqr", // optional if included in URL
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    throw new Error("MongoDB connection failed");
  }
};
