import express from "express";
import upload from "../middleware/multerConfig.js"; // default import, no curly braces

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

export default router;