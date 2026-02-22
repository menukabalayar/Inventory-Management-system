// loginController.js
import { User } from "../model/userModel.js";
import { generateToken } from "../security/jwt-utils.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!password) return res.status(400).send({ message: "Password is required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const token = generateToken({ user: user.toJSON() });
    const userData = user.toJSON();
    delete userData.password;

    return res.status(200).send({
      data: { access_token: token, user: userData },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res.status(200).send({ data: user, message: "Successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};