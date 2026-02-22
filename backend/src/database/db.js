// src/database/db.js
import { Sequelize } from "sequelize";


// Create sequelize instance
export const sequelize = new Sequelize("InventorySystem", "postgres", "menuka", {
  host: "localhost",
  dialect: "postgres",
});

// Connection and table creation
export const connection = async () => {
  try {
    // ❗ DO NOT connect during tests
    if (process.env.NODE_ENV === "test") {
      console.log("DB connection skipped in test mode");
      return;
    }

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database connected successfully");
  } catch (e) {
    console.error("Database connection failed:", e.message);
  }
};