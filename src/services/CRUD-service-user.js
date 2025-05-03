import { Op } from "sequelize";
import { hashPassword } from "../lib/index.js";
import userRepository from "../repositories/users-repositories.js";

export function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const users = await db.Users.findAll({
        attributes: { exclude: ["password"] },
      });
      if (users) {
        result.status = 200;
        result.message = "Users retrieved successfully";
        result.data = users;
        return resolve(result);
      }

      result.status = 404;
      result.message = "No users found";
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Error retrieving users";
      result.data = error.message;
      reject(result);
    }
  });
}
export function getUserById(userId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await db.Users.findOne({
        where: { userId },
        attributes: { exclude: ["password"] },
      });

      if (user) {
        result.status = 200;
        result.message = "User retrieved successfully";
        result.data = user;
        return resolve(result);
      }

      result.status = 404;
      result.message = "User not found";
      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error retrieving user";
      result.data = error.message;
      reject(result);
    }
  });
}
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const existingUser = await db.Users.findOne({
        where: {
          [Op.or]: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      });
      if (existingUser) {
        result.status = 409;
        result.message = "User already exists";
        return resolve(result);
      }

      const hash_password = await hashPassword(userData.password);
      userData.password = hash_password;
      userData.role = userData.role.toUpperCase();
      const user = await db.Users.create(userData);
      if (user) {
        result.status = 201;
        result.message = "User created successfully";
        result.data = user;
        return resolve(result);
      }

      result.status = 400;
      result.message = "Error creating user";
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Error creating user";
      result.data = error.message;
      reject(result);
    }
  });
}
export function updateUser(userData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await db.Users.findOne({
        where: { userId: userData.userId },
      });
      if (!user) {
        result.status = 404;
        result.message = "User not found";
        return reject(result);
      }
      const existingUser = await db.Users.findOne({
        where: {
          [Op.and]: [
            { userId: { [Op.ne]: userData.userId } },
            {
              [Op.or]: [
                { email: userData.email ?? "" },
                { phoneNumber: userData.phoneNumber ?? "" },
              ],
            },
          ],
        },
      });
      if (existingUser) {
        result.status = 409;
        result.message = "Email or phone number already exists";
        return resolve(result);
      }

      await user.update(userData);
      result.status = 200;
      result.message = "User updated successfully";
      result.data = user;
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function deleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const user = await db.Users.findOne({
        where: { userId },
        attributes: { exclude: ["password"] },
      });
      if (user) {
        result.status = 200;
        result.message = "User deleted successfully";
        result.data = user;
        await user.destroy();
        return resolve(result);
      }

      result.status = 404;
      result.message = "User not found";
      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error deleting user";
      result.data = error.message;
      reject(result);
    }
  });
}
