import CategoriesRepository from "../../../repositories/categories-repositories.js";

export default async function CreateCategory(categoryData) {
    try {
        // Check categories exist
        const isCategory = await CategoriesRepository.findOne({
            where: { name: categoryData.name ?? 0 },
        });
        if (isCategory) {
            return {
                status: 404,
                message: "Category Already exist!",
                data: null,
            };
        }

        // Create a new category.
        const category = await CategoriesRepository.create(categoryData);

        // Fail
        if (!category) {
            return {
                status: 400,
                message: "Creating new category fail!",
                data: null,
            };
        }
        
        console.log(category);
        // Success
        return {
            status: 201,
            message: "Category created successfully!",
            data: category,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tạo mới category: ", error.message);
        return {
            status: 501,
            message: "An error occurred while creating a new category!",
            data: null,
        };
    }
}
