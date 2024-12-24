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

// Test route to add a new lead
app.post("/api/test", async (req, res) => {
  try {
    // Create a lead
    const lead = await Lead.create({
      name: "Sample Restaurant",
      address: "123 Main St",
    });

    // Add a Point of Contact for the lead
    const poc = await POC.create({
      leadId: lead._id,
      name: "John Doe",
      role: "Manager",
      contactInfo: "john.doe@example.com",
    });

    res.status(201).json({ lead, poc });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default app;
