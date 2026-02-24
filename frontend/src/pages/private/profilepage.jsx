import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Header } from "../Header";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { apiRequest } from "../../utils/api";

export default function ProfilePage({ currentUser, setToken, setUser }) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  // Fetch profile
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchProfile = async () => {
      try {
        const res = await apiRequest("GET", `/users/${currentUser.id}`);
        const data = res.data;

        setName(data.name || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
        setGender(data.gender || "");

        setUser(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [currentUser?.id, setUser]);

  // Update profile
  const handleSave = async () => {
    try {
      await apiRequest("PATCH", `/users/${currentUser.id}`, {
        data: { name, address, phone, gender },
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);

      // Update currentUser in parent state
      setUser({ ...currentUser, name, address, phone, gender });
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Delete account
  const handleDelete = async () => {
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
      await apiRequest("DELETE", `/users/${currentUser.id}`);
      localStorage.clear();
      setToken(null);
      toast.success("Account deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
  };

  if (!currentUser) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <>
      <Header />
      <div className="profile-page">
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
    </>
  );
}