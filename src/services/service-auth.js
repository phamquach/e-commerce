import { checkPassword, hashPassword } from "../lib/index.js";
import { mailOptions, transport } from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

export function loginService(userEmail, password, userToken) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      // check token if it exists
      if (userToken) {
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await db.Users.findOne({
          where: { email: decoded.email },
          raw: true,
        });
        if (user) {
          result.status = 200;
          result.message = "Already logged in";
          result.data = decoded;
          resolve(result);
        } else {
          result.status = 403;
          result.message = "Invalid token";
          reject(result);
        }
        return;
      }
      // check if user exists
      const user = await db.Users.findOne({
        where: { email: userEmail },
        raw: true,
      });
      if (!user) {
        result.status = 404;
        result.message = "User not found";
        reject(result);
        return;
      }

      delete user.createdAt;
      delete user.updatedAt;

      if (!user.isVerified) {
        const newCode = uuidv4();
        user.verifiedCode = newCode;
        user.verifiedTime = Date.now() + 5 * 60 * 1000; // 5 minutes
        await db.Users.update(user, {
          where: { email: userEmail },
        });
        // send email verification
        transport.sendMail(mailOptions(userEmail, newCode), (error, info) => {
          if (error) {
            console.log("Error sending email: ", error);
            result.status = 500;
            result.message = "Error sending verification email";
            result.data = error.message;
          } else {
            console.log("Email sent: ", info.response);
            result.status = 200;
            result.message = "Verification code resent";
          }
        });
        delete user.verifiedTime;
        delete user.verifiedCode;
        delete user.isVerified;
        delete user.password;

        result.status = 403;
        result.message = "Email not verified";
        result.data = user;
        reject(result);
        return;
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        result.status = 401;
        result.message = "Invalid password";
        reject(result);
        return;
      }

      if (user.token) {
        const decoded = jwt.verify(user.token, process.env.JWT_SECRET);
        if (decoded.email === userEmail) {
          result.status = 404;
          result.message = "User is logged in elsewhere, please log out";
          resolve(result);
          return;
        }
      }

      delete user.verifiedTime;
      delete user.verifiedCode;
      delete user.isVerified;
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });
      await db.Users.update(
        { token },
        {
          where: { email: userEmail },
        }
      );
      delete user.token;
      result.status = 200;
      result.message = "Login successful";
      result.data = {
        token,
        user,
      };
      resolve(result);
    } catch (error) {
      console.error("Error in loginService:", error.message);
      result.status = 500;
      result.message = "Internal server error";
      result.data = error;
      reject(result);
    }
  });
}
export function registerService(userData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await db.Users.findOne({
        where: { email: userData.email },
        raw: true,
      });
      if (user) {
        result.status = 409;
        result.message = "Email already exists";
        reject(result);
        return;
      }

      delete userData?.isVerified;
      delete userData?.verifiedTime;
      delete userData?.verifiedCode;

      const code = uuidv4();
      const hashedPassword = await hashPassword(userData.password);
      const newUser = await db.Users.create({
        ...userData,
        password: hashedPassword,
        verifiedCode: code,
        isVerified: false,
        verifiedTime: Date.now() + 5 * 60 * 1000,
      });
      result.status = 201;
      result.message = "User created successfully";
      delete newUser.dataValues.password;
      result.data = newUser;
      // send email verification
      transport.sendMail(mailOptions(userData.email, code), (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          result.status = 500;
          result.message = "Internal server error";
          reject(result);
          return;
        } else {
          console.log("Email sent:", info.response);
        }
      });
      resolve(result);
    } catch (error) {
      console.error("Error in registerService:", error.message);
      result.status = 500;
      result.message = "Internal server error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function logoutService(token) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decoded.email;
      if (!userEmail) {
        result.status = 403;
        result.message = "Token not found";
        resolve(result);
        return;
      }

      const user = await db.Users.findOne({
        where: { email: userEmail },
        raw: true,
      });
      if (!user) {
        result.status = 404;
        result.message = "User not found";
        resolve(result);
        return;
      }
      await db.Users.update(
        { token: null },
        {
          where: { email: userEmail },
        }
      );
      result.status = 200;
      result.message = "Logout successful";
      resolve(result);
    } catch (error) {
      console.error("Error in logoutService:", error.message);
      result.status = 500;
      result.message = "Internal server error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function checkVerifiedUser(verifiedCode, userEmail) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await db.Users.findOne({
        where: { email: userEmail },
        raw: true,
      });

      if (!user) {
        result.status = 404;
        result.message = "User not found";
        resolve(result);
        return;
      }

      if (user.isVerified) {
        result.status = 403;
        result.message = "Email already verified";
        resolve(result);
        return;
      }

      if (user.verifiedTime < Date.now()) {
        result.status = 403;
        result.message = "Verification code expired";
        resolve(result);
        return;
      }

      if (user.verifiedCode !== verifiedCode) {
        const newCode = uuidv4();
        user.verifiedCode = newCode;
        user.verifiedTime = Date.now() + 5 * 60 * 1000; // 5 minutes
        await db.Users.update(user, {
          where: { email: userEmail },
        });
        transport.sendMail(mailOptions(userEmail, newCode), (error, info) => {
          if (error) {
            console.log("Error sending email: ", error);
            result.status = 500;
            result.message = "Error sending verification email";
            result.data = error.message;
          } else {
            console.log("Email sent: ", info.response);
            result.status = 200;
            result.message = "Verification code resent";
          }
          resolve(result);
        });
      }

      user.isVerified = true;
      user.verifiedTime = null;
      user.verifiedCode = null;
      await db.Users.update(user, {
        where: { email: userEmail },
      });
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.isVerified;
      delete user.verifiedTime;
      delete user.verifiedCode;
      result.status = 200;
      result.message = "Email verified successfully";
      result.data = user;
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Error checking verification code";
      result.data = error.message;
      reject(result);
    }
  });
}
export function checkTokenService(token) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      if (!token) {
        result.status = 403;
        result.message = "Token not found";
        resolve(result);
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.Users.findOne({
        where: { email: decoded.email },
        raw: true,
      });
      if (!user) {
        result.status = 403;
        result.message = "Invalid token";
        resolve(result);
        return;
      }

      if (user.token !== token) {
        result.status = 403;
        result.message = "Token mismatch";
        resolve(result);
        return;
      }

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.isVerified;
      delete user.verifiedTime;
      delete user.verifiedCode;
      delete user.token;
      result.status = 200;
      result.message = "Token is valid";
      result.data = user;
      resolve(result);
    } catch (error) {
      console.error("Error in checkTokenService:", error.message);
      result.status = 500;
      result.message = "Internal server error";
      result.data = error.message;
      reject(result);
    }
  });
}
