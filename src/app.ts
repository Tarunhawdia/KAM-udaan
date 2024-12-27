import express from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import { Lead, POC } from "./models";
import interactionRoutes from "./routes/interactionRoutes";
import leadRoutes from "./routes/leadRoutes";
import pocRoutes from "./routes/pocRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(express.json());
// Use the interaction routes
app.use("/api/interactions", interactionRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/poc", pocRoutes);

dotenv.config();
app.use(errorHandler);

// Connect to Database
connectDB();

// Placeholder for routes
app.get("/", (req, res) => {
  res.send("KAM Lead Management System API is running...");
});

export default app;
