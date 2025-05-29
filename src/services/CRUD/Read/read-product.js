import { Op, Sequelize } from "sequelize";
import ProductsRepository from "../../../repositories/products-repositories.js";

async function getOneProduct(productId) {
    try {
        // Find product in Database
        const isProduct = await ProductsRepository.findOne({
            where: { productId },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        // Fail
        if (!isProduct) {
            return {
                status: 404,
                message: "Product not found!",
                data: null,
            };
        }

        // Success
        return {
            status: 200,
            message: "Successfully found product!",
            data: isProduct,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy thông tin sản phẩm: ", error.message);
        return {
            status: 501,
            message: "An error occurred while retrieving product information!",
            data: null,
        };
    }
}

async function getAllProduct(searchQuery = null, categoryId = null, pageSize, pageNumber) {
    // Check pageNumber & pageSize
    pageNumber = pageNumber ? pageNumber : 1;
    pageSize = pageSize ? pageSize : 10;

    const offset = (pageNumber - 1) * pageSize;
    const whereClause = [];

    // Check searchQuery & categoryId
    if (searchQuery)
        whereClause.push(Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), "LIKE", `%${searchQuery}%`));
    if (categoryId) whereClause.push({ categoryId });

    try {
        // Find product in database
        const isProducts = await ProductsRepository.findAll({
            where: {
                [Op.and]: whereClause,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            limit: pageSize,
            offset,
        });

        // Fail
        if (!isProducts) {
            return {
                status: 404,
                message: "Products not found",
                data: null,
            };
        }

        // Success
        return {
            status: 200,
            message: "Successfully found product!",
            data: isProducts,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy thông tin sản phẩm: ", error.message);
        return {
            status: 501,
            message: "An error occurred while retrieving products information!",
            data: null,
        };
    }
}

const ReadProduct = {
    getOneProduct,
    getAllProduct,
};
export default ReadProduct;
