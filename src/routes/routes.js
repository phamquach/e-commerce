import express from "express";
import config from "../controllers/index.js";
import * as middleware from "../middleware/middleware.js";

const router = express.Router();
export const initWebRoutes = (app) => {
  // -- Auth
  router.post("/api/auth/login", config.auth.login);
  router.post("/api/auth/register", config.auth.register);
  router.post("/api/auth/verify-email", config.auth.verifyEmail);
  router.get("/api/auth/logout", config.auth.logout);
  router.get("/api/auth/refresh-token", config.auth.refreshToken);
  router.get("/api/auth/me", config.auth.checkToken);

  // -- Product
  router.get("/api/products", config.products.getProducts);
  router.get("/api/product", config.products.getProductsBySearch);
  router.get(
    "/api/products", // /api/products?id&categoryId&preloadStartItem&pageSize
    config.products.getProducts
  );
  router.post(
    "/api/products",
    middleware.checkCookiesAdmin,
    config.products.createProduct
  );
  router.put(
    "/api/products",
    middleware.checkCookiesAdmin,
    config.products.updateProduct
  );
  router.delete(
    "/api/products/:id",
    middleware.checkCookiesAdmin,
    config.products.deleteProduct
  );

  // -- Category
  router.get("/api/categories", config.categories.getCategories);
  router.get("/api/categories?id", config.categories.getCategories);
  router.post(
    "/api/categories",
    middleware.checkCookiesAdmin,
    config.categories.createCategory
  );
  router.put(
    "/api/categories",
    middleware.checkCookiesAdmin,
    config.categories.updateCategory
  );
  router.delete(
    "/api/categories/:id",
    middleware.checkCookiesAdmin,
    config.categories.deleteCategory
  );

  // -- Order
  router.get(
    "/api/orders",
    middleware.checkCookiesAdmin,
    config.orders.getAllOrders
  );
  router.get(
    "/api/orders/:id",
    middleware.checkCookiesAdmin,
    config.orders.getOrderById
  );
  router.post(
    "/api/orders",
    middleware.checkCookiesAdmin,
    config.orders.createOrder
  );
  router.put(
    "/api/orders",
    middleware.checkCookiesAdmin,
    config.orders.updateOrder
  );
  router.delete(
    "/api/orders/:id",
    middleware.checkCookiesAdmin,
    config.orders.deleteOrder
  );

  // User
  router.post(
    "/api/user-update",
    middleware.checkCookiesUser,
    config.users.updateUser_Post
  );
  router.get(
    "/api/users",
    middleware.checkCookiesAdmin,
    config.users.getAllUsers
  );
  router.get(
    "/api/users/:id",
    middleware.checkCookiesAdmin,
    config.users.getUserById
  );
  router.post(
    "/api/users",
    middleware.checkCookiesAdmin,
    config.users.createUser
  );
  router.put(
    "/api/users",
    middleware.checkCookiesAdmin,
    config.users.updateUser_Put
  );
  router.delete(
    "/api/users/:id",
    middleware.checkCookiesAdmin,
    config.users.deleteUser
  );
  // Checkout
  // router.post("/api/checkout", config.checkout.processCheckout);

  app.use(router);
};
