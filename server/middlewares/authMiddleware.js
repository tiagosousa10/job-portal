import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  try {
    const token = req.headers.token; // Get token from headers

    if (!token) {
      return res.json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.company = await Company.findById(decoded.id).select("-password"); // Find user by ID

    next(); // If valid token, continue to next middleware
  } catch (error) {
    res.json({
      success: false,
      message: "Token is not valid - " + error.message,
    });
  }
};
