import express from "express";
import { login, init} from "../controller/loginController.js";
const router = express.Router();
router.get("/init", init);
router.post("/login", login);

export { router as loginRouter };
