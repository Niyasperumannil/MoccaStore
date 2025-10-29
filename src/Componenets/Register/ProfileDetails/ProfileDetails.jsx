import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfileDetails.css";
import LandingPageHeader from "../../LangingPageMain/LandingPageHeader/LandingPageHeader";
import Footer from "../../LangingPageMain/Footer/Footer";
import MyOrders from "../../MyOrders/MyOrders";

const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const BACKEND_URL = "https://backendmocca.onrender.com";

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          navigate("/Register", { replace: true });
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setFormData(data);
        setOriginalData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setError(null);
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setEditMode(false);
    setError(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You are not logged in.");
      navigate("/Register", { replace: true });
      return;
    }

    setSaving(true);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/auth/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = response.data.user || formData;
      setFormData(updated);
      setOriginalData(updated);
      setEditMode(false);
      alert(response.data.message || "Profile updated successfully!");
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Logout function — instant redirect
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("phoneNumber");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <>
        <LandingPageHeader />
        <div className="profile-wrapper">Loading profile…</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <LandingPageHeader />

      <div className="profile-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-header">
            <div className="avatar"></div>
            <div>
              <h4>Hello {formData.firstName || "User"}!</h4>
              <a href="#" className="view-details">
                View Details
              </a>
            </div>
          </div>

          <ul className="menu">
            <li>🛍️ My Orders</li>
            <li>💖 My Wishlist</li>
            <li>🛡️ Saved Details</li>
            <li>⚙️ Account Settings</li>
            <li>🖋️ WestStyleClub</li>
            <hr />
            <li>📍 Store Locator</li>
            <li>📞 Contact Us</li>
            <hr />
            <li>👥 About Us</li>
            <li>📄 Terms of Use</li>
            <li>🔒 Privacy Policy</li>
            <li>🎁 Get Benefits</li>
            <hr />
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Profile Details */}
        <div className="profile-container">
          <h3 className="profile-title">Profile Details</h3>
          {error && <div className="error-message">{error}</div>}

          <div className="profile-row">
            <div className="profile-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile-row">
            <div className="profile-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-group">
            {!editMode ? (
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            ) : (
              <>
                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <MyOrders />
      <Footer />
    </>
  );
};

export default ProfileDetails;
