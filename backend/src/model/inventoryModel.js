import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Inventory = sequelize.define("Inventory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productName: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price: { type: DataTypes.FLOAT, allowNull: false },
  supplier: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM("Available", "Out of Stock"), defaultValue: "Available" },
  image: { type: DataTypes.STRING }
});