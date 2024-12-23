import mongoose, { Schema, Document } from "mongoose";

interface IInteraction extends Document {
  leadId: mongoose.Types.ObjectId; // Reference to a Lead
  type: "call" | "email" | "meeting"; // Type of interaction
  date: Date; // Date of the interaction
  notes: string; // Additional notes or details about the interaction
}

const InteractionSchema: Schema = new Schema(
  {
    leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    type: {
      type: String,
      enum: ["call", "email", "meeting"],
      required: true,
    },
    date: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

const Interaction = mongoose.model<IInteraction>(
  "Interaction",
  InteractionSchema
);

export default Interaction;
