import express from "express";
import config from "../controllers/index.js";
import * as middleware from "../middleware/middleware.js";

const router = express.Router();
export const initWebRoutes = (app) => {
  // Product routes
  router.get("/api/products", config.products.getAllProducts);
  router.get("/api/products/:id", config.products.getProductById);
  router.post("/api/products", config.products.createProduct);
  router.put("/api/products", config.products.updateProduct);
  router.delete("/api/products/:id", config.products.deleteProduct);

  // Category routes
  router.get("/api/categories", config.categories.getAllCategories);
  router.get("/api/categories/:id", config.categories.getCategoryById);
  router.post("/api/categories", config.categories.createCategory);
  router.put("/api/categories", config.categories.updateCategory);
  router.delete("/api/categories/:id", config.categories.deleteCategory);

  // Order routes
  router.get("/api/orders", config.orders.getAllOrders);
  router.get("/api/orders/:id", config.orders.getOrderById);
  router.post("/api/orders", config.orders.createOrder);
  router.put("/api/orders", config.orders.updateOrder);
  router.delete("/api/orders/:id", config.orders.deleteOrder);

  // Order Item routes
  // router.get("/api/order-items", config.orderItems.getAllOrderItems);
  // router.get("/api/order-items/:id", config.orderItems.getOrderItemById);
  // router.post("/api/order-items", config.orderItems.createOrderItem);

  // Cart routes
  // router.get("/api/carts", config.carts.getAllCarts);
  // router.get("/api/carts/:id", config.carts.getCartById);
  // router.post("/api/carts", config.carts.createCart);
  // router.put("/api/carts", config.carts.updateCart);
  // router.delete("/api/carts/:id", config.carts.deleteCart);

  // User routes
  router.get("/api/users", config.users.getAllUsers);
  router.get("/api/users/:id", config.users.getUserById);
  router.post("/api/users", config.users.createUser);
  router.put("/api/users", config.users.updateUser);
  router.delete("/api/users/:id", config.users.deleteUser);

  // Checkout routes
  // router.post("/api/checkout", config.checkout.processCheckout);

  // Auth routes
  router.post("/api/auth/login", config.auth.login);
  router.post("/api/auth/register", config.auth.register);
  router.post("/api/auth/verify-email", config.auth.verifyEmail);
  router.get("/api/auth/logout", config.auth.logout);
  router.get("/api/auth/refresh-token", config.auth.refreshToken);
  router.get("/api/auth/check-token", config.auth.checkToken);
  app.use(middleware.checkCookies);
  app.use("/", router);
};
