// USER CONTROLLER
import ReadUser from "../services/CRUD/Read/read-user.js";
import CreateUser from "../services/CRUD/Create/create-user.js";
import UpdateUser from "../services/CRUD/Update/update-user.js";
import DeleteUser from "../services/CRUD/Delete/delete-user.js";

export async function getAllUsers(req, res) {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);

    const { data, message, status } = await ReadUser.getAllUsers(pageNumber, pageSize);
    res.status(status).json({
        message,
        data,
    });
}
export async function getUserById(req, res) {
    const userId = req.params.id;
    const { data, message, status } = await ReadUser.getOneUse(userId);
    res.status(status).json({
        message,
        data,
    });
}
export async function createUser(req, res) {
    const userData = req.body;
    const { data, message, status } = await CreateUser(userData);
    res.status(status).json({
        message,
        data,
    });
}
export async function updateUser(req, res) {
    const userData = req.body;
    const id = userData.userId;
    const { data, message, status } = await UpdateUser(userData, id);
    res.status(status).json({
        message,
        data,
    });
}
export async function deleteUser(req, res) {
    const userId = req.params.id;
    const { data, message, status } = await DeleteUser(userId);
    res.status(status).json({
        message,
        data,
    });
}
