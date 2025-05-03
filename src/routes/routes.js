import express from "express";
import config from "../controllers/index.js";
import * as middleware from "../middleware/middleware.js";

const router = express.Router();
export const initWebRoutes = (app) => {
  // Public router
  // -- Product
  router.get("/api/products", config.products.getAllProducts);
  router.get("/api/products/:id", config.products.getProductById);
  // -- Category
  router.get("/api/categories", config.categories.getAllCategories);
  router.get("/api/categories/:id", config.categories.getCategoryById);
  // -- Auth
  router.post("/api/auth/login", config.auth.login);
  router.post("/api/auth/register", config.auth.register);
  router.post("/api/auth/verify-email", config.auth.verifyEmail);
  router.get("/api/auth/logout", config.auth.logout);
  router.get("/api/auth/refresh-token", config.auth.refreshToken);
  router.get("/api/auth/check-token", config.auth.checkToken);

  
  // Private router
  // -- Product
  router.post("/api/products", middleware.checkCookies, config.products.createProduct);
  router.put("/api/products", middleware.checkCookies, config.products.updateProduct);
  router.delete("/api/products/:id", middleware.checkCookies, config.products.deleteProduct);
  // -- Category
  router.post("/api/categories", middleware.checkCookies, config.categories.createCategory);
  router.put("/api/categories", middleware.checkCookies, config.categories.updateCategory);
  router.delete("/api/categories/:id", middleware.checkCookies, config.categories.deleteCategory);
  // -- Order
  router.get("/api/orders", middleware.checkCookies, config.orders.getAllOrders);
  router.get("/api/orders/:id", middleware.checkCookies, config.orders.getOrderById);
  router.post("/api/orders", middleware.checkCookies, config.orders.createOrder);
  router.put("/api/orders", middleware.checkCookies, config.orders.updateOrder);
  router.delete("/api/orders/:id", middleware.checkCookies, config.orders.deleteOrder);
  // User
  router.get("/api/users", middleware.checkCookies, config.users.getAllUsers);
  router.get("/api/users/:id", middleware.checkCookies, config.users.getUserById);
  router.post("/api/users", middleware.checkCookies, config.users.createUser);
  router.put("/api/users", middleware.checkCookies, config.users.updateUser);
  router.delete("/api/users/:id", middleware.checkCookies, config.users.deleteUser);
  // Checkout
  // router.post("/api/checkout", config.checkout.processCheckout);

  app.use(router)
};
