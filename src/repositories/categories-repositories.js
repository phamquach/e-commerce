import db from "../models/index.js";

const CategoriesRepository = {
  findAll: async (condition) => {
    return await db.Categories.findAll(condition);
  },

  findOne: async (condition) => {
    return await db.Categories.findOne(condition);
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

export default CategoriesRepository;
