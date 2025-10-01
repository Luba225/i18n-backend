import mongoose from "mongoose";

export async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("🔴 MONGO_URI is not set in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("🟢 Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("🔴 MongoDB connection error: ", error);
    process.exit(1);
  }
}
