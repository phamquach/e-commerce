import { Op } from "sequelize";
import validator from "validator";

import { hashPassword } from "../../../lib/index.js";
import UserRepository from "../../../repositories/users-repositories.js";

export default async function CreateUser(userData) {
    try {
        // Check user data
        const isPhoneNumber = validator.isMobilePhone(
            userData.phoneNumber,
            "vi-VN"
        );
        const isEmail = validator.isEmail(userData.email);
        if (!isPhoneNumber || !isEmail) {
            return {
                status: 409,
                message: "Invalid email or phone number",
                data: null,
            };
        }

        // Check email and phone number in database
        const isUser = await UserRepository.findOne({
            where: {
                [Op.or]: [
                    { email: userData.email },
                    { phoneNumber: userData.phoneNumber },
                ],
            },
        });
        if (Boolean(isUser)) {
            return {
                status: 409,
                message: "Email or phone number already exist!",
                data: null,
            };
        }

        // Create User
        const hash_password = await hashPassword(userData.password);
        const role = ["ADMIN", "USER"].includes(userData.role?.toUpperCase())
            ? userData.role?.toUpperCase()
            : "USER";
        const user = await UserRepository.create({
            ...userData,
            password: hash_password,
            role: role,
            isVerified: true,
        });

        // Fail
        if (!user) {
            return {
                status: 400,
                message: "Creating user failed!",
                data: null,
            };
        }

        // Success
        delete user.dataValues.password;
        return {
            status: 201,
            message: "User created successfully!",
            data: user.dataValues,
        };
        
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tạo mới user: ", error.message);
        return {
            status: 501,
            message: "An error occurred while creating a new user!",
            data: null,
        };
    }
}
