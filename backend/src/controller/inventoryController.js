import { Inventory } from "../model/inventoryModel.js";

// Get all inventories
export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll();
    res.status(200).json({
      success: true,
      count: inventories.length,
      data: inventories
    });
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Add new inventory with image
export const addInventory = async (req, res) => {
  try {
    const { productName, category, quantity, price, supplier, status, categoryId, supplierId } = req.body;

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Safe parse numeric fields
    const quantityNum = parseInt(quantity);
    const priceNum = parseFloat(price);
    const categoryIdNum = parseInt(categoryId);
    const supplierIdNum = parseInt(supplierId);

    // Text validation
    if (!productName || !category || !supplier || !status) {
      return res.status(400).json({ message: "Required text fields are missing" });
    }

    // Number validation
    if (isNaN(quantityNum)) {
      return res.status(400).json({ message: "Quantity must be a valid number" });
    }

    if (isNaN(priceNum)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    if (isNaN(categoryIdNum)) {
      return res.status(400).json({ message: "CategoryId must be a valid number" });
    }

    if (isNaN(supplierIdNum)) {
      return res.status(400).json({ message: "SupplierId must be a valid number" });
    }

    // Create new inventory
    const newInventory = await Inventory.create({
      productName,
      category,
      quantity: quantityNum,
      price: priceNum,
      supplier,
      status,
      categoryId: categoryIdNum,
      supplierId: supplierIdNum,
      image: req.file.filename
    });

    res.status(201).json({ message: "Product added successfully", product: newInventory });

  } catch (error) {
    console.error("Full Error:", error);
    res.status(500).json({ message: error.message });
  }
};