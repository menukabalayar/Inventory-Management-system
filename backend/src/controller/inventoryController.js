// src/controllers/inventoryController.js
import { Inventory } from "../model/inventoryModel.js";

export const addInventory = async (req, res) => {
  try {
    const { productName, category, quantity, price, supplier, status, categoryId, supplierId } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = await Inventory.create({
      productName,
      category,
      quantity,
      price,
      supplier,
      status,
      categoryId: categoryId || 1,
      supplierId: supplierId || 1,
      image
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      imageUrl: image ? `http://localhost:5000/uploads/${image}` : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};