// CATEGORY CONTROLLER
import * as categoryService from "../services/CRUD-service-category.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(categories.status).json({
      message: categories.message,
      data: categories.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function getCategoryById(req, res) {
  const categoryId = req.params.id;
  try {
    const category = await categoryService.getCategoryById(categoryId);
    res.status(category.status).json({
      message: category.message,
      data: category.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function createCategory(req, res) {
  try {
    const categoryData = req.body;
    const newCategory = await categoryService.createCategory(categoryData);
    res.status(newCategory.status).json({
      message: newCategory.message,
      data: newCategory.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function updateCategory(req, res) {
  const categoryData = req.body;
  try {
    const updatedCategory = await categoryService.updateCategory(categoryData);
    res.status(updatedCategory.status).json({
      message: updatedCategory.message,
      data: updatedCategory.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    res.status(deletedCategory.status).json({
      message: deletedCategory.message,
      data: deletedCategory.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
