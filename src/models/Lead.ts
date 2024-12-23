import mongoose, { Schema, Document } from "mongoose";

interface ILead extends Document {
  name: string;
  address: string;
  status: "new" | "in-progress" | "won" | "lost";
  createdAt: Date;
  updatedAt: Date;
  callFrequency: "daily" | "weekly" | "monthly";
  nextCallDate: Date;
  ordersPlaced: number; // Track number of orders placed
  orderingFrequency: number; // Track ordering frequency
  lastOrderDate: Date; // Track last order date
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in-progress", "won", "lost"],
      default: "new",
    },
    callFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    nextCallDate: { type: Date, required: true },
    ordersPlaced: { type: Number, default: 0 }, // New field for orders
    orderingFrequency: { type: Number, default: 0 }, // New field for ordering frequency
    lastOrderDate: { type: Date, default: null }, // New field for last order date
  },
  { timestamps: true }
);

const Lead = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
