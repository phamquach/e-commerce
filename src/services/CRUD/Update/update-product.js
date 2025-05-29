import ReadProduct from "../Read/read-product.js";

export default async function UpdateProduct(productId, newProductData) {
    try {
        // Check product in database
        const isProduct = await ReadProduct.getOneProduct(productId);
        if (!Boolean(isProduct.data)) {
            return isProduct;
        }

        // Update new data
        for (const key in isProduct.data.dataValues) {
            if (newProductData.hasOwnProperty(key)) {
                isProduct.data[key] = newProductData[key];
            }
        }
        await isProduct.data.save();

        return {
            status: 200,
            message: "Update product success!",
            data: isProduct.data.dataValues,
        };
    } catch (error) {
        console.log("Đã xảy ra lỗi khi cập nhập product: ", error.message);
        return {
            status: 501,
            message: "An error occurred while updating product!",
            data: null,
        };
    }
}
