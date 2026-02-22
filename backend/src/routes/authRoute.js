import express from "express";
import { loginController } from "../../controller/index.js";
const router = express.Router();
router.get("/init", loginController.init);
router.post("/login", loginController.login);

export { router as loginRouter };
