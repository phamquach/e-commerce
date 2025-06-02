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
    // -- Get
    router.get("/api/products/:id", config.products.getProductsById);
    router.get("/api/products", config.products.getProductByQuery);
    // -- Create
    router.post("/api/products", middleware.checkCookiesAdmin, config.products.createProduct);
    // -- Update
    router.put("/api/products/:id", middleware.checkCookiesAdmin, config.products.updateProduct);
    // -- Delete
    router.delete("/api/products/:id", middleware.checkCookiesAdmin, config.products.deleteProduct);

    // -- Category
    // -- Get
    router.get("/api/categories", config.categories.getCategories);
    // -- Create
    router.post("/api/categories", middleware.checkCookiesAdmin, config.categories.createCategory);
    // -- Update
    router.put("/api/categories/:id", middleware.checkCookiesAdmin, config.categories.updateCategory);
    // -- Delete
    router.delete("/api/categories/:id", middleware.checkCookiesAdmin, config.categories.deleteCategory);

    // -- Order
    router.get("/api/orders", middleware.checkCookiesAdmin, config.orders.getAllOrders);
    router.get("/api/orders/:id", middleware.checkCookiesAdmin, config.orders.getOrderById);
    router.post("/api/orders", middleware.checkCookiesAdmin, config.orders.createOrder);
    router.put("/api/orders", middleware.checkCookiesAdmin, config.orders.updateOrder);
    router.delete("/api/orders/:id", middleware.checkCookiesAdmin, config.orders.deleteOrder);

    // -- User
    // -- GET
    router.get("/api/users", middleware.checkCookiesAdmin, config.users.getAllUsers);
    router.get("/api/users/:id", middleware.checkCookiesAdmin, config.users.getUserById);
    // -- Create
    router.post("/api/users", config.users.createUser);
    // -- Update
    router.put("/api/users", middleware.checkCookiesAdmin, config.users.updateUser);
    // -- Delete
    router.delete("/api/users/:id", middleware.checkCookiesAdmin, config.users.deleteUser);

    // Checkout
    // router.post("/api/checkout", config.checkout.processCheckout);

    app.use(router);
};
