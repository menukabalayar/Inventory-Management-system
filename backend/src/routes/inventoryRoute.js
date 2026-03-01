// routes/inventoryRoute.js
import express from "express";
import { getAllInventories, addInventory } from "../controller/inventoryController.js";
import upload from "../middleware/multerConfig.js";
const inventoryRouter = express.Router();



// ✅ Routes
inventoryRouter.get("/", getAllInventories);   // Get all products
inventoryRouter.post("/add", upload.single("image"), addInventory); // Add product with image

export default inventoryRouter;


