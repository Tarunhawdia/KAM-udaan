import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/kam-lead-management";

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
