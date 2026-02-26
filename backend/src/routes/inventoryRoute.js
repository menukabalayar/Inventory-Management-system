// routes/inventoryRoute.js
import express from "express";
const router = express.Router();


// GET all inventories
router.get("/", (req, res) => {
  res.json(inventories);
});

// GET inventory by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = inventories.find((inv) => inv.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

export default router;
