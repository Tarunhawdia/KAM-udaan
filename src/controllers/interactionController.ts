import { Request, Response } from "express";
import Interaction from "../models/Interaction";

export const addInteraction = async (req: Request, res: Response) => {
  try {
    const { leadId, type, date, notes } = req.body;

    // Validate leadId
    const interaction = new Interaction({
      leadId,
      type,
      date,
      notes,
    });

    await interaction.save();
    res.status(201).json(interaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
