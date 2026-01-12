const Inventory = require("../models/Inventory");

// Add Item
exports.addItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json({ message: "Item added", item });
  } catch (error) {
    res.status(500).json({ message: "Item add failed" });
  }
};

// Get All Items
exports.getItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch items" });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
