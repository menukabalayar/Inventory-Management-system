import React, { useEffect, useState } from "react";
import "./profilepage.css";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { apiRequest } from "../../utils/api";
import Header from "../../components/Header";

export default function ProfilePage({ setUser }) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  // Load current user ID from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  // Fetch latest user data from backend
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await apiRequest("GET", `/users/${userId}`);
      const user = res.data;

      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setPhone(user.phone);
      setGender(user.gender);

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    }
  };

  fetchProfile();
}, []);

  // Update profile
  const handleSave = async () => {
    if (!userId) return;

    try {
      const res = await apiRequest("PATCH", `/users/${userId}`, {
        data: { name, address, phone, gender },
      });

      const updatedUser = res.data.data; // API returns updated user
      toast.success("Profile updated successfully");
      setIsEditing(false);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!userId) return;

    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await apiRequest("DELETE", `/users/${userId}`);
      localStorage.clear();
      setUser(null);
      toast.success("Account deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!storedUser) {
    return <p className="loading-text">No user found. Please login.</p>;
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={email} disabled />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              value={address}
              disabled={!isEditing}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              value={phone}
              disabled={!isEditing}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              value={gender}
              disabled={!isEditing}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="button-group">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}