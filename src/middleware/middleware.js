import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.js";
dotenv.config();
export const checkCookies = async (req, res, next) => {
  const token = req.cookies.token;
  const pathName = req.path;
  const excludedPaths = [
    "/api",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/verify-email",
    "/api/auth/logout",
    "/api/auth/refresh-token",
    "/api/auth/check-token",
  ];
  if (excludedPaths.includes(pathName)) {
    return next();
  }
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
