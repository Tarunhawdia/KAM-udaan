import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";

const startServer = async () => {
  try {
    await connectDB(DB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
