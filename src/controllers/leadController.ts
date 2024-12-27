import { Request, Response } from "express";
import Lead from "../models/Lead";

// Add a new lead
export const addLead = async (req: Request, res: Response) => {
  try {
    const { name, address, status, callFrequency } = req.body;

    // Calculate the next call date based on frequency
    const currentDate = new Date();
    let nextCallDate: Date;

    switch (callFrequency) {
      case "daily":
        nextCallDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        break;
      case "weekly":
        nextCallDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        break;
      case "monthly":
        nextCallDate = new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        );
        break;
      default:
        nextCallDate = currentDate;
        break;
    }

    const newLead = new Lead({
      name,
      address,
      status,
      callFrequency,
      nextCallDate,
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Get leads requiring calls today
export const getLeadsForToday = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today

    const leads = await Lead.find({
      nextCallDate: { $lte: today }, // Find leads whose next call date is today or earlier
    });

    res.status(200).json(leads);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const trackPerformance = async (req: Request, res: Response) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Log the calculated date for debugging
    console.log("One Month Ago:", oneMonthAgo);

    // Debug query results for underperforming leads
    const underperformingLeads = await Lead.find({
      lastOrderDate: { $lt: oneMonthAgo },
      ordersPlaced: { $gt: 0 },
    });
    console.log("Underperforming Leads Query Result:", underperformingLeads);

    // Debug query results for well-performing leads
    const wellPerformingLeads = await Lead.find({
      orderingFrequency: { $gte: 5 },
    });
    console.log("Well-Performing Leads Query Result:", wellPerformingLeads);

    res.status(200).json({
      underperformingLeads,
      wellPerformingLeads,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
