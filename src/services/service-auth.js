import { checkPassword, decodedToken, hashPassword } from "../lib/index.js";
import { mailOptions, transport } from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import UserRepository from "../repositories/users-repositories.js";
import { Op } from "sequelize";

export async function loginService(userEmail, password, userToken) {
  try {
    const user = await UserRepository.findOne({
      where: { email: userEmail },
      attributes: {
        exclude: ["verifiedCode", "verifiedTime", "createdAt", "updatedAt"],
      },
      raw: true,
    });

    // Nếu user không tồn tại trong hệ thống thì trả về lỗi!
    if (!user) {
      return {
        status: 404,
        message: "Email is incorrect",
        data: null,
      };
    }
    const isPassword = await checkPassword(password, user.password);
    const user_token = user.token;
    delete user.token;
    delete user.password;

    // Check password
    if (!isPassword) {
      return {
        status: 404,
        message: "Password is incorrect!",
        data: null,
      };
    }

    // Login with token
    if (user_token && decodedToken(user_token)) {
      const result = {};

      // Nếu token tồn tại ở phía client!
      if (userToken === user_token) {
        result.status = 200;
        result.message = "Already logged in!";
      }

      // Không có token thì dùng mật khẩu
      else {
        result.status = 200;
        result.message = "Login success!";
        result.data = { token: user_token };
      }
      result.data = { ...result.data, user };
      console.log(result);
      return result;
    }

    // Login with password
    // -- Cập nhập token vào database
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await UserRepository.update({ where: { userId: user.userId } }, { token });

    // Xoá token khỏi response
    delete user.token;

    return {
      status: 200,
      message: "Login success!",
      data: { token, user },
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

export function registerService(userData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await UserRepository.findOne({
        where: {
          [Op.or]: {
            phoneNumber: userData.phoneNumber,
            email: userData.email,
          },
        },
        raw: true,
      });
      if (user) {
        result.status = 409;
        result.message = "Email or phone number already exists";
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
      delete newUser.dataValues.verifiedCode;
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
      result.message = "Invalid token";
      result.data = error.message;
      reject(result);
    }
  });
}
