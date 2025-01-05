import { Request, Response, NextFunction } from "express";

import Lead from "../models/Lead";

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
      return;
    }
  }
};

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
export const getLeadsForToday = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Start of today (00:00:00)

    const endOfToday = new Date(currentDate);
    endOfToday.setHours(23, 59, 59, 999); // End of today (23:59:59)

    // Query for leads that need to be called today
    const leads = await Lead.find({
      $or: [
        {
          nextCallDate: { $gte: currentDate, $lte: endOfToday }, // Leads with nextCallDate today
        },
        {
          callFrequency: "daily", // Leads with daily call frequency
        },
      ],
    });

    if (leads.length === 0) {
      res.status(404).json({ message: "No leads to call today." });
      return;
    }

    res.status(200).json({ leads });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving leads for today.", error });
  }
};

export const trackPerformance = async (req: Request, res: Response) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    console.log("One Month Ago:", oneMonthAgo);

    // Step 1: Debugging query for underperforming leads
    const underperformingQuery = {
      $or: [
        { lastOrderDate: { $lt: oneMonthAgo } }, // Last order older than one month
        { lastOrderDate: { $exists: false } }, // No last order date
      ],
      ordersPlaced: { $gt: 0 }, // Only leads with orders placed
    };

    console.log(
      "Underperforming Leads Query:",
      JSON.stringify(underperformingQuery, null, 2)
    );

    // Query for underperforming leads
    const underperformingLeads = await Lead.find(underperformingQuery);
    console.log("Underperforming Leads Query Result:", underperformingLeads);

    // Step 2: Debugging query for well-performing leads
    const wellPerformingQuery = {
      ordersPlaced: { $gte: 5 }, // Leads with more than 5 orders placed
    };

    console.log(
      "Well-Performing Leads Query:",
      JSON.stringify(wellPerformingQuery, null, 2)
    );

    // Query for well-performing leads
    const wellPerformingLeads = await Lead.find(wellPerformingQuery);
    console.log("Well-Performing Leads Query Result:", wellPerformingLeads);

    // Step 3: Respond with data
    res.status(200).json({
      underperformingLeads,
      wellPerformingLeads,
    });
  } catch (error) {
    console.error("Error in trackPerformance:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
