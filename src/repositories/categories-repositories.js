import db from "../models/index.js";

const categoriesRepository = {
  findAll: async () => {
    return await db.Categories.findAll();
  },

  findOne: async (categoryId) => {
    return await db.Categories.findOne({
      where: { categoryId },
    });
  },

  create: async (categoryData) => {
    return await db.Categories.create(categoryData);
  },
  
  update: async (categoryId, data) => {
    return await db.Categories.update(data, { where: { categoryId } });
  },

  delete: async (categoryId) => {
    return await db.Categories.destroy({
      where: { categoryId },
    });
  },
};

export default categoriesRepository;
