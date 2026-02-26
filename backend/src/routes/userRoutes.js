import express from "express";
import { init } from "../controller/loginController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import { getById } from "../controller/userController.js";

const router = express.Router();

router.get("/init", authenticateToken, init);  // protected route
router.get("/:id", getById);

export default router;