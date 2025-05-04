import db from "../models/index.js";

const ProductsRepository = {
  findAll: async (condition) => {
    return await db.Products.findAll({
      where: condition,
    });
  },

  findOne: async (condition) => {
    return await db.Products.findOne({
      where: condition,
    });
  },

  create: async (productData) => {
    return await db.Products.create(productData);
  },

  update: async (productId, data) => {
    return await db.Products.update(data, { where: { productId } });
  },

  delete: async (productId) => {
    return await db.Products.destroy({
      where: { productId },
    });
  },
};

export default ProductsRepository;
