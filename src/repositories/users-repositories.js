import db from "../models/index.js";
const UserRepository = {
  findAll: async (condition = {}) => {
    return await db.Users.findAll(condition);
  },

  findOne: async (condition = {}) => {
    return await db.Users.findOne(condition);
  },

  create: async (userData) => {
    return await db.Users.create(userData);
  },

  update: async (condition = {}, data) => {
    return await db.Users.update(data, condition );
  },

  delete: async (userId) => {
    return await db.Users.destroy({
      where: { userId },
    });
  },
};

export default UserRepository;
