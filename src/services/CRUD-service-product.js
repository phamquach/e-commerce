import db from "../models/index.js";

export function getAllProducts() {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const products = await db.Products.findAll();
      if (!products) {
        result.status = 404;
        result.message = "No products found";
        return resolve(result);
      }

      result.status = 200;
      result.message = "Products fetched successfully";
      result.data = products;

      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error fetching products";
      result.data = error.message;
      reject(result);
    }
  });
}
export function getProductById(productId) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const product = await db.Products.findOne({
        where: { productId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      result.status = 200;
      result.message = "Product fetched successfully";
      result.data = product;

      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error fetching product";
      result.data = error.message;
      reject(result);
    }
  });
}
export function createProduct(productData) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const existingProduct = await db.Products.findOne({
        where: { name: productData.name },
      });
      if (existingProduct) {
        result.status = 400;
        result.message = "Product already exists";
        return resolve(result);
      }

      const newProduct = await db.Products.create(productData);
      if (!newProduct) {
        result.status = 400;
        result.message = "Error creating product";
        return resolve(result);
      }

      result.status = 201;
      result.message = "Product created successfully";
      result.data = newProduct;

      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error creating product";
      result.data = error.message;
      reject(result);
    }
  });
}
export function updateProduct(productData) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const product = await db.Products.findOne({
        where: { productId: productData.productId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      await db.Products.update(productData, {
        where: { productId: productData.productId },
      });

      result.status = 200;
      result.message = "Product updated successfully";
      result.data = productData;

      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error updating product";
      result.data = error.message;
      reject(result);
    }
  });
}
export async function deleteProduct(productId) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const product = await db.Products.findOne({
        where: { productId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      await db.Products.destroy({
        where: { productId },
      });

      result.status = 200;
      result.message = "Product deleted successfully";

      resolve(result);
    } catch (error) {
      result.status = 500;
      result.message = "Error deleting product";
      result.data = error.message;
      reject(result);
    }
  });
}
