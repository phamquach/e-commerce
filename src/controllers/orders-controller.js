// ORDER CONTROLLER
import * as orderService from "../services/CRUD-service-order.js";
export async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();
    res.status(orders.status).json({
      message: orders.message,
      data: orders.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      error: error.data,
    });
  }
}
export async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await orderService.getOrderById(orderId);
    res.status(order.status).json({
      message: order.message,
      data: order.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function createOrder(req, res) {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(newOrder.status).json({
      message: newOrder.message,
      data: newOrder.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function updateOrder(req, res) {
  const orderData = req.body;
  try {
    const updatedOrder = await orderService.updateOrder(orderData);
    res.status(updatedOrder.status).json({
      message: updatedOrder.message,
      data: updatedOrder.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const deletedOrder = await orderService.deleteOrder(orderId);
    res.status(deletedOrder.status).json({
      message: deletedOrder.message,
      data: deletedOrder.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}