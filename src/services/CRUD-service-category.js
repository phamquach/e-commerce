import db from "../models/index.js";

export function getAllCategories() {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const categories = await db.Categories.findAll();
      if (!categories) {
        result.status = 404;
        result.message = "No categories found";
        return reject(result);
      }

      result.status = 200;
      result.message = "Categories retrieved successfully";
      result.data = categories;
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function getCategoryById(categoryId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const category = await db.Categories.findOne({
        where: { categoryId },
      });
      if (!category) {
        result.status = 404;
        result.message = "Category not found";
        return reject(result);
      }

      result.status = 200;
      result.message = "Category retrieved successfully";
      result.data = category;
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function createCategory(categoryData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const newCategory = await db.Categories.create(categoryData);
      if (!newCategory) {
        result.status = 400;
        result.message = "Failed to create category";
        return reject(result);
      }

      result.status = 201;
      result.message = "Category created successfully";
      result.data = newCategory;
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function updateCategory(categoryData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const category = await db.Categories.findOne({
        where: { categoryId: categoryData.categoryId },
      });
      if (!category) {
        result.status = 404;
        result.message = "Category not found";
        return reject(result);
      }

      await db.Categories.update(categoryData, {
        where: { categoryId: categoryData.categoryId },
      });

      result.status = 200;
      result.message = "Category updated successfully";
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
export function deleteCategory(categoryId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const category = await db.Categories.findOne({
        where: { categoryId },
      });
      if (!category) {
        result.status = 404;
        result.message = "Category not found";
        return reject(result);
      }

      await db.Categories.destroy({
        where: { categoryId },
      });

      result.status = 200;
      result.message = "Category deleted successfully";
      resolve(result);
    } catch (error) {
      console.log(error.message);
      result.status = 500;
      result.message = "Internal Server Error";
      result.data = error.message;
      reject(result);
    }
  });
}
