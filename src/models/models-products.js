"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      // Định nghĩa associations nếu cần
    }
  }

  Products.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories", // Tên bảng trong DB, thường là số nhiều
          key: "categoryId",
        },
      },
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "Products",
    }
  );

  return Products;
};
