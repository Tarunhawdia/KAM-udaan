import { Request, Response, NextFunction, RequestHandler } from "express";
import POC from "../models/POC";
import Lead from "../models/Lead";

// Add a new POC for a specific lead
export const addPOC: RequestHandler = async (req, res, next) => {
  const { leadId } = req.params;
  const { name, role, contactInfo } = req.body;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return; // Stop execution
    }

    const poc = new POC({ leadId, name, role, contactInfo });
    await poc.save();

    res.status(201).json({ message: "POC added successfully", poc });
  } catch (error) {
    res.status(500).json({ message: "Error adding POC", error });
  }
};

// Get all POCs for a specific lead
export const getPOCsForLead: RequestHandler = async (req, res, next) => {
  const { leadId } = req.params;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }

    const pocs = await POC.find({ leadId });
    res.status(200).json({ pocs });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving POCs", error });
  }
};

// Update a specific POC
export const updatePOC: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { name, role, contactInfo } = req.body;

  try {
    const poc = await POC.findByIdAndUpdate(
      id,
      { name, role, contactInfo },
      { new: true }
    );

    if (!poc) {
      res.status(404).json({ message: "POC not found" });
      return;
    }

    res.status(200).json({ message: "POC updated successfully", poc });
  } catch (error) {
    res.status(500).json({ message: "Error updating POC", error });
  }
};

// Delete a specific POC
export const deletePOC: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const poc = await POC.findByIdAndDelete(id);

    if (!poc) {
      res.status(404).json({ message: "POC not found" });
      return;
    }

    res.status(200).json({ message: "POC deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting POC", error });
  }
};
