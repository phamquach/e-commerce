"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // Định nghĩa associations nếu cần
    }
  }

  Orders.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "paid",
          "shipped",
          "delivered",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
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
      modelName: "Orders",
      tableName: "Orders",
    }
  );

  return Orders;
};
