import { Inventory } from "../model/inventoryModel.js";

// Get all inventories
export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll(); // Fetch all inventories
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

export const addInventory = async (req, res) => {
  try {
    const { productName, category, quantity, price, supplier, status, categoryId, supplierId } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image is required" });

    // ✅ Input validation
      if (!productName || !category || !supplier || !status) {
      return res.status(400).json({ message: "Required text fields are missing" });
    }

    if (!quantity || isNaN(parseInt(quantity))) {
      return res.status(400).json({ message: "Quantity must be a valid number" });
    }

    if (!price || isNaN(parseFloat(price))) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    if (!categoryId || isNaN(parseInt(categoryId))) {
      return res.status(400).json({ message: "CategoryId must be a valid number" });
    }

    if (!supplierId || isNaN(parseInt(supplierId))) {
      return res.status(400).json({ message: "SupplierId must be a valid number" });
    }

    // ✅ Safe parse
    const newInventory = await Inventory.create({
      productName,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      supplier,
      status,
      categoryId: parseInt(categoryId),
      supplierId: parseInt(supplierId),
      image: req.file.filename,
    });

    res.status(201).json({ message: "Product added successfully", product: newInventory });

  } catch (error) {
    console.error("Full Error:", error);
    res.status(500).json({ message: error.message });
  }
};

