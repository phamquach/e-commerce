const userRepository = {
  findAll: async () => {
    return await db.Users.findAll({
      attributes: { exclude: ["password"] },
    });
  },

  findOne: async (userId) => {
    return await db.Users.findOne({
      where: { userId },
      attributes: { exclude: ["password"] },
    });
  },

  create: async (userData) => {
    return await db.Users.create(userData);
  },

  update: async (userId, data) => {
    return await db.Users.update(data, { where: { userId } });
  },

  delete: async (userId) => {
    return await db.Users.destroy({
      where: { userId },
    });
  },
};

export default userRepository;
