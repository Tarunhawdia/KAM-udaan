import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
