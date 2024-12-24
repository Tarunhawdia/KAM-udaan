import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Access denied, no token provided" });
    return; // Ensure no further code is executed
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    (req as any).user = decoded; // Store decoded user info in req.user
    next(); // Pass control to the next middleware/handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
