import ProductsRepository from "../../../repositories/products-repositories.js";
import ReadProduct from "../Read/read-product.js";

export default async function DeleteProduct(productId) {
    try {
        // Find product in database
        const isProduct = await ReadProduct.getOneProduct(productId);
        if (!isProduct.data) {
            return isProduct;
        }

        // Delete product
        await ProductsRepository.delete(productId);
        return {
            status: 200,
            message: 'Delete a product success!',
            data: isProduct.data
        }

    } catch (error) {
        console.log("Đã xảy ra lỗi khi xoá product: ", error.message);
        return {
            status: 501,
            message: "An error occurred while delete a product!",
            data: null,
        };
    }
}
