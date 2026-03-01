import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, address, email, password, phone, gender } = req.body;

    // 🔥 HASH PASSWORD HERE
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      address,
      email,
      password: hashedPassword,   // save hashed password
      phone,
      gender,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};