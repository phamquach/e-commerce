import ReadCategory from "../Read/read-category.js";
import CategoriesRepository from "../../../repositories/categories-repositories.js";

export default async function DeleteCategory(categoryId) {
    try {
        // Find Category in database
        const isCategory = await ReadCategory.getOneCategory(categoryId);
        if (!isCategory.data) {
            return isCategory;
        }

        // Delete Category
        await CategoriesRepository.delete(categoryId);
        return {
            status: 200,
            message: "Delete a Category success!",
            data: isCategory.data,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi xoá danh mục: ", error.message);
        return {
            status: 501,
            message: "An error occurred while delete a Category!",
            data: null,
        };
    }
}
