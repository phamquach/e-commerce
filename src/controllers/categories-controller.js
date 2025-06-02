// CATEGORY CONTROLLER
import ReadCategory from "../services/CRUD/Read/read-category.js";
import CreateCategory from "../services/CRUD/Create/create-category.js";
import UpdateProduct from "../services/CRUD/Update/update-category.js";
import DeleteCategory from "../services/CRUD/Delete/delete-category.js";

export async function getCategories(req, res) {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);

    const { status, message, data } = await ReadCategory.getAllCategories(pageSize, pageNumber);
    res.status(status).json({
        message,
        data,
    });
}
export async function createCategory(req, res) {
    const categoryData = req.body;
    const { status, message, data } = await CreateCategory(categoryData);
    res.status(status).json({
        message,
        data,
    });
}
export async function updateCategory(req, res) {
    const categoryData = req.body;
    const categoryId = req.params.id;
    const { status, message, data } = await UpdateProduct(categoryId, categoryData);
    res.status(status).json({
        message,
        data,
    });
}
export async function deleteCategory(req, res) {
    const categoryId = req.params.id;
    const { status, message, data } = await DeleteCategory(categoryId);
    res.status(status).json({
        message,
        data,
    });
}
