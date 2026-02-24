export const getUserProfile = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user profile ${id}` });
};

export const updateUserProfile = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Update user profile ${id}` });
};

export const deleteUserProfile = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete user profile ${id}` });
};