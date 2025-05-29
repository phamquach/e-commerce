// PRODUCT CONTROLLER
import ReadProduct from "../services/CRUD/Read/read-product.js";
import CreateProduct from "../services/CRUD/Create/create-product.js";
import UpdateProduct from "../services/CRUD/Update/update-product.js";
import DeleteProduct from "../services/CRUD/Delete/delete-product.js";

export async function getProductsById(req, res) {
    const productId = req.params.id;
    const { status, message, data } = await ReadProduct.getOneProduct(productId);
    res.status(status).json({
        message,
        data,
    });
}
export async function getProductByQuery(req, res) {
    const searchQuery = req.query.search_q;
    const categoryId = req.query.categoryId;
    const pageSize = parseInt(req.query.pageSize);
    const pageNumber = parseInt(req.query.pageNumber);

    const { status, message, data } = await ReadProduct.getAllProduct(searchQuery, categoryId, pageSize, pageNumber);
    res.status(status).json({
        message,
        data,
    });
}
export async function createProduct(req, res) {
    const productData = req.body;
    const { status, message, data } = await CreateProduct(productData);
    res.status(status).json({
        message,
        data,
    });
}
export async function updateProduct(req, res) {
    const newProductData = req.body;
    const id = req.params.id;
    const { status, message, data } = await UpdateProduct(id, newProductData);
    res.status(status).json({
        message,
        data,
    });
}
export async function deleteProduct(req, res) {
    const productId = req.params.id;
    const {status, message, data } = await DeleteProduct(productId);
    res.status(status).json({
        message,
        data,
    });
}
