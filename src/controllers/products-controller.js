// PRODUCT CONTROLLER
import { Op } from "sequelize";
import * as productService from "../services/CRUD-service-product.js";

export async function getProducts(req, res) {
  const categoryId = req.query.categoryId;
  const productId = req.query.id;
  const preloadStartItem = req.query.preloadStartItem;
  const pageSize = req.query.pageSize;
  try {
    const options = {
      where: {
        categoryId: categoryId ? categoryId : { [Op.ne]: "" },
        productId: productId ? productId : { [Op.ne]: "" },
      },
    };
    if (preloadStartItem && pageSize) {
      options.limit = parseInt(pageSize);
      options.offset = parseInt(preloadStartItem);
    }
    const products = await productService.getAllProducts(options);
    res.status(products.status).json({
      message: products.message,
      data: products.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function getProductsBySearch(req, res) {
  const search_query = decodeURIComponent(req.query.search_query);
  try {
    const product = await productService.getProductBySearchQuery(search_query);
    res.status(product.status).json({
      message: product.message,
      data: product.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function createProduct(req, res) {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(newProduct.status).json({
      message: newProduct.message,
      data: newProduct.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function updateProduct(req, res) {
  const productData = req.body;
  try {
    const updatedProduct = await productService.updateProduct(productData);
    res.status(updatedProduct.status).json({
      message: updatedProduct.message,
      data: updatedProduct.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function deleteProduct(req, res) {
  const productId = req.params.id;
  try {
    const deletedProduct = await productService.deleteProduct(productId);
    res.status(deletedProduct.status).json({
      message: deletedProduct.message,
      data: deletedProduct.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
