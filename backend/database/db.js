import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres", "postgres", "menuka", {
  host: "localhost",
  dialect: "postgres",
});

export const connection = () => {
  try {
    sequelize.sync({alter});
    console.log("Database Connected Sucessfully");
  } catch (e) {
    console.log(e);
  }
};
