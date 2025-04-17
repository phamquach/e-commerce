// USER CONTROLLER
import * as userService from "../services/CRUD-service-user.js";
export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(users.status).json({
      message: users.message,
      data: users.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
        data: error.data,
    });
  }
}
export async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(user.status).json({
      message: user.message,
      data: user.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function createUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(newUser.status).json({
      message: newUser.message,
      data: newUser.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function updateUser(req, res) {
  const userData = req.body;
  try {
    const updatedUser = await userService.updateUser(userData);
    res.status(updatedUser.status).json({
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
export async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedUser = await userService.deleteUser(userId);
    res.status(deletedUser.status).json({
      message: deletedUser.message,
      data: deletedUser.data,
    });
  } catch (error) {
    res.status(error.status).json({
      error: error.message,
      data: error.data,
    });
  }
}
