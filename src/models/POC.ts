import mongoose, { Schema, Document } from "mongoose";

interface IPOC extends Document {
  leadId: mongoose.Types.ObjectId; // Reference to a lead
  name: string;
  role: string;
  contactInfo: string;
}

const POCSchema: Schema = new Schema(
  {
    leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

const POC = mongoose.model<IPOC>("POC", POCSchema);

export default POC;
