import UserRepository from "../../../repositories/users-repositories.js";
import ReadUser from "../Read/read-user.js";

export default async function DeleteUser(userId) {
    try {
        // Find user in database
        const isUser = await ReadUser.getOneUse(userId);
        if (!isUser.data) {
            return isUser;
        }

        // Delete user
        await UserRepository.delete(userId);
        return {
            status: 200,
            message: 'Delete a user success!',
            data: isUser.data
        }

    } catch (error) {
        console.log("Đã xảy ra lỗi khi xoá user: ", error.message);
        return {
            status: 501,
            message: "An error occurred while delete a new user!",
            data: null,
        };
    }
}
