import express from "express";
import { login, init} from "../controller/loginController.js";
import { registerUser } from "../controller/registerController.js";
const router = express.Router();
router.get("/init", init);
router.post("/login", login);
router.post("/register", registerUser);

export { router as loginRouter };

