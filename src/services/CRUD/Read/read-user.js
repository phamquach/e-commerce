import UserRepository from "../../../repositories/users-repositories.js";

// Response Data
const RES_DATA = [
    "userId",
    "firstName",
    "lastName",
    "avatar",
    "phoneNumber",
    "email",
    "address",
    "role",
];

async function getOneUse(userId = 0) {
    try {
        // Find user in Database
        const user = await UserRepository.findOne({
            where: { userId },
            attributes: RES_DATA,
        });

        // Fail
        if (!user) {
            return {
                status: 404,
                message: "User not found!",
                data: null,
            };
        }

        // Success
        return {
            status: 200,
            message: "Successfully found user!",
            data: user,
        };
        
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tạo mới user: ", error.message);
        return {
            status: 501,
            message: "An error occurred while retrieving user information!",
            data: null,
        };
    }
}

async function getAllUsers(pageNumber, pageSize) {
    try {
        // Get users in database
        const offset = (pageNumber - 1) * pageSize;
        const users = await UserRepository.findAll({
            attributes: RES_DATA,
            limit: pageSize,
            offset
        });

        // Success
        return {
            status: 200,
            message: "Successfully get all users!",
            data: users,
        };

    } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy thông tin user: ", error.message);
        return {
            status: 501,
            message: "An error occurred while retrieving user information!",
            data: null,
        };
    }
}

const ReadUser =  {
    getOneUse,
    getAllUsers,
};
export default ReadUser;