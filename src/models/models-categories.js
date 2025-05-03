"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      // Định nghĩa associations nếu cần
    }
  }

  Categories.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "Categories",
    }
  );

  return Categories;
};
