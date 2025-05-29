import CategoriesRepository from "../../../repositories/categories-repositories.js";
import ProductsRepository from "../../../repositories/products-repositories.js";

export default async function CreateProduct(productData) {
    try {
        // Check categories
        const isCategory = await CategoriesRepository.findOne({
            where: { categoryId: productData.categoryId ?? 0 },
        });
        if (!isCategory) {
            return {
                status: 404,
                message: "Category not found",
                data: null,
            };
        }

        // Check product exist
        const isProduct = await ProductsRepository.findOne({
            where: { name: productData.name },
        });
        if (isProduct) {
            return {
                status: 409,
                message: "Product already exist!",
                data: null,
            };
        }

        // Create a new product.
        const product = await ProductsRepository.create(productData);

        // Fail
        if (!product) {
            return {
                status: 400,
                message: "Creating new product fail!",
                data: null,
            };
        }
        console.log(product)
        // Success
        return {
            status: 201,
            message: "Product created successfully!",
            data: product
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tạo mới product: ", error.message);
        return {
            status: 501,
            message: "An error occurred while creating a new product!",
            data: null,
        };
    }
}
