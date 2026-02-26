import express from "express";
import { init } from "../controller/loginController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import { deleteById, getById, updateById } from "../controller/userController.js";

const router = express.Router();

router.get("/init", authenticateToken, init);  // protected route
router.get("/:id", getById);
router.patch("/:id",  updateById);
router.delete("/:id", deleteById);




export default router;