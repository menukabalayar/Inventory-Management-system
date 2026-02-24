import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ims", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};
