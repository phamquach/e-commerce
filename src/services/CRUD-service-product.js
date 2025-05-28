import { Sequelize } from "sequelize";
import ProductsRepository from "../repositories/products-repositories.js";

export function getAllProducts(condition) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const products = await ProductsRepository.findAll(condition);
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
      const product = await ProductsRepository.findOne({
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
export function getProductByCategories(categoryId) {
  return new Promise(async () => {
    const result = {};
    try {
      const product = await ProductsRepository.findAll({
        where: { categoryId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      result.status = 200;
      result.message = "Success!";
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
export function getProductBySearchQuery(search_query) {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await ProductsRepository.findAll({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          "LIKE",
          `%${search_query}%`
        ),
      });
      console.log(products);
      resolve({
        status: 200,
        message: "Success!",
        data: products,
      });
    } catch (error) {
      console.log("Loi", error.message);
      reject({
        status: 500,
        message: "Error searching products",
        data: null,
      });
    }
  });
}
export function createProduct(productData) {
  return new Promise(async (resolve, reject) => {
    let result = {};
    try {
      const existingProduct = await ProductsRepository.findOne({
        where: { name: productData.name },
      });
      console.log("Check: ", existingProduct);
      if (existingProduct) {
        result.status = 400;
        result.message = "Product already exists";
        return resolve(result);
      }

      const newProduct = await ProductsRepository.create(productData);
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
      const product = await ProductsRepository.findOne({
        where: { productId: productData.productId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      await ProductsRepository.update(productData.productId, productData);

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
      const product = await ProductsRepository.findOne({
        where: { productId },
      });
      if (!product) {
        result.status = 404;
        result.message = "Product not found";
        return resolve(result);
      }

      await ProductsRepository.delete(productId);
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
