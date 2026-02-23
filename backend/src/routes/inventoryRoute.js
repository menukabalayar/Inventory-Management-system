// src/routes/inventoryRoutes.js
import express from "express";
import upload from "../middleware/multerConfig.js"; // <-- default import
import { addInventory } from "../controller/inventoryController.js";

const inventoryRouter = express.Router();

// POST /api/inventory/add
inventoryRouter.post("/add", upload.single("image"), addInventory);

export default inventoryRouter; // <-- default export