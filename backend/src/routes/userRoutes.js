import express from "express";
import { init } from "../controller/loginController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import { deleteById, getById, updateById } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/init", authenticateToken, init);  // protected route
userRouter.get("/:id", getById);
userRouter.patch("/:id",  updateById);
userRouter.delete("/:id", deleteById);




export default userRouter;