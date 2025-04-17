import db from "../models/index.js";

export function getAllOrders() {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const orders = await db.Orders.findAll();
      if (!orders) {
        result.status = 404;
        result.message = "No orders found";
        return reject(result);
      }

      result.status = 200;
      result.message = "Orders retrieved successfully";
      result.data = orders;
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
export function getOrderById(orderId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const order = await db.Orders.findOne({
        where: { orderId },
      });
      if (!order) {
        result.status = 404;
        result.message = "Order not found";
        return reject(result);
      }

      result.status = 200;
      result.message = "Order retrieved successfully";
      result.data = order;
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
export function createOrder(orderData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const newOrder = await db.Orders.create(orderData);
      if (!newOrder) {
        result.status = 400;
        result.message = "Failed to create order";
        return reject(result);
      }

      result.status = 201;
      result.message = "Order created successfully";
      result.data = newOrder;
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
export function updateOrder(orderData) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const order = await db.Orders.findOne({
        where: { orderId: orderData.orderId },
      });
      if (!order) {
        result.status = 404;
        result.message = "Order not found";
        return reject(result);
      }

      await order.update(orderData);

      result.status = 200;
      result.message = "Order updated successfully";
      result.data = order;
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
export function deleteOrder(orderId) {
  return new Promise(async (resolve, reject) => {
    const result = {};
    try {
      const order = await db.Orders.findOne({
        where: { orderId },
      });
      if (!order) {
        result.status = 404;
        result.message = "Order not found";
        return reject(result);
      }

      await order.destroy();

      result.status = 200;
      result.message = "Order deleted successfully";
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
