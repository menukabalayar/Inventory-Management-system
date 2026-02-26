import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "../models/userModel.js";

export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
});