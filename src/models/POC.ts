import mongoose, { Schema, Document } from "mongoose";

interface IPOC extends Document {
  leadId: mongoose.Schema.Types.ObjectId; // Reference to the associated lead
  name: string;
  role: string; // Role of the POC (e.g., Manager, Owner)
  contactInfo: {
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const POCSchema: Schema = new Schema(
  {
    leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const POC = mongoose.model<IPOC>("POC", POCSchema);

export default POC;
