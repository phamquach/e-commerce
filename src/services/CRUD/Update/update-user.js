import ReadUser from "../Read/read-user.js";

export default async function UpdateUser(newUserData = {}, userId = 0) {
    try {
        // Find user in database
        const isUser = await ReadUser.getOneUse(userId);
        if (!Boolean(isUser.data)) {
            return isUser;
        }

        // Handle role
        const role = ["ADMIN", "USER"].includes(newUserData.role?.toUpperCase())
            ? newUserData.role?.toUpperCase()
            : "USER";

        // Update new data
        for (const key in isUser.data.dataValues) {
            if (newUserData.hasOwnProperty(key)) {
                isUser.data[key] = newUserData[key];
            }
        }
        isUser.data.role = role;
        await isUser.data.save();

        return {
            status: 200,
            message: "Update user success!",
            data: isUser.data.dataValues,
        };

    } catch (error) {
        console.log("Đã xảy ra lỗi khi cập nhập user: ", error.message);
        return {
            status: 501,
            message: "An error occurred while updating user information!",
            data: null,
        };
    }
}
