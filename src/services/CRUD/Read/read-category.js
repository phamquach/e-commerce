import CategoriesRepository from "../../../repositories/categories-repositories.js";

async function getOneCategory(categoryId) {
    try {
        // Find category in Database
        const isCategory = await CategoriesRepository.findOne({
            where: { categoryId },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        // Fail
        if (!isCategory) {
            return {
                status: 404,
                message: "Category not found!",
                data: null,
            };
        }

        // Success
        return {
            status: 200,
            message: "Successfully get category!",
            data: isCategory,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy thông tin danh mục: ", error.message);
        return {
            status: 501,
            message: "An error occurred while get category information!",
            data: null,
        };
    }
}

async function getAllCategories(pageSize, pageNumber) {
    // Check pageNumber & pageSize
    pageNumber = pageNumber ? pageNumber : 1;
    pageSize = pageSize ? pageSize : 10;

    const offset = (pageNumber - 1) * pageSize;
    try {
        // Find category in database
        const isCategory = await CategoriesRepository.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            limit: pageSize,
            offset,
        });

        // Fail
        if (!isCategory) {
            return {
                status: 404,
                message: "Category not found",
                data: null,
            };
        }

        // Success
        return {
            status: 200,
            message: "Successfully get all categories!",
            data: isCategory,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy danh sách danh mục: ", error.message);
        return {
            status: 501,
            message: "An error occurred while get list categories!",
            data: null,
        };
    }
}

const ReadCategory = {
    getOneCategory,
    getAllCategories,
};
export default ReadCategory;
