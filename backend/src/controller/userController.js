import { User } from "../model/userModel.js";

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user, message: "User fetched successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    await user.save();

    res.status(200).json({ data: user, message: "Profile updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};