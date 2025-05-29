"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Carts extends Model {
    static associate(models) {
      // Định nghĩa associations nếu cần
    }
  }

  Carts.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
    },
    {
      sequelize,
      modelName: "Carts",
      tableName: "Carts",
    }
  );

  return Carts;
};
