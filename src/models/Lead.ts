import mongoose, { Schema, Document } from "mongoose";

interface ILead extends Document {
  name: string;
  address: string;
  status: "new" | "in-progress" | "won" | "lost";
  createdAt: Date;
  updatedAt: Date;
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
    // other fields...
  },
  { timestamps: true }
);

const Lead = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
