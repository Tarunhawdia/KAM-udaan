import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// TODO: Add API routes here
export default app;
