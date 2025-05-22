import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.js";
dotenv.config();
export const checkCookiesAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.Users.findOne({
      where: { email: decoded.email },
      raw: true,
    });
    if (!user) {
      res.clearCookie("token");
      return res.status(403).json({ message: "Invalid token" });
    }

    if (user.token !== token) {
      res.clearCookie("token");
      return res.status(403).json({ message: "Token mismatch" });
    }

    if (user.role !== "ADMIN") {
      return res.status(400).json({ message: "User does not have access" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const checkCookiesUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.Users.findOne({
      where: { email: decoded.email },
      raw: true,
    });
    if (!user) {
      res.clearCookie("token");
      return res.status(403).json({ message: "Invalid token" });
    }

    if (user.token !== token) {
      res.clearCookie("token");
      return res.status(403).json({ message: "Token mismatch" });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
