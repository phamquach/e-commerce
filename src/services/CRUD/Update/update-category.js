import ReadCategory from "../Read/read-category.js";

export default async function UpdateProduct(categoryId, newCategoryData) {
    try {
        // Check product in database
        const isCategory = await ReadCategory.getOneCategory(categoryId);
        if (!Boolean(isCategory.data)) {
            return isCategory;
        }

        // Update new data
        for (const key in isCategory.data.dataValues) {
            if (newCategoryData.hasOwnProperty(key)) {
                isCategory.data[key] = newCategoryData[key];
            }
        }
        await isCategory.data.save();

        return {
            status: 200,
            message: "Update category success!",
            data: isCategory.data.dataValues,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi cập nhập danh sách: ", error.message);
        return {
            status: 501,
            message: "An error occurred while updating category!",
            data: null,
        };
    }
}
