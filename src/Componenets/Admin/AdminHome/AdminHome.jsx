import React, { useState } from "react";
import "./AdminHome.css";
import AddMenProduct from "../AddMenProduct/AddMenProduct";
import AddWomenProduct from "../AddWomenProduct/AddWomenProduct"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Doctors");

  const renderContent = () => {
    switch (activeSection) {
      case "Doctors":
        return (
          <div className="content-section">
            <h2 className="section-title">Doctors Management</h2>
            <p className="section-description">Here you can manage all doctors.</p>
            <AddMenProduct />
          </div>
        );
      case "Reviews":
        return (
          <div className="content-section">
            <h2 className="section-title">Reviews Management</h2>
            <p className="section-description">Here you can manage all reviews.</p>
            <AddWomenProduct />
          </div>
        );
      case "Bookings":
        return (
          <div className="content-section">
            <h2 className="section-title">Appointments</h2>
            <p className="section-description">Here you can view and manage bookings.</p>
          </div>
        );
      default:
        return <h2 className="welcome-message">Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-title">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-item ${activeSection === "Doctors" ? "active" : ""}`}
            onClick={() => setActiveSection("Doctors")}
          >
            Men
          </li>
          <li
            className={`sidebar-item ${activeSection === "Reviews" ? "active" : ""}`}
            onClick={() => setActiveSection("Reviews")}
          >
            women
          </li>
          <li
            className={`sidebar-item ${activeSection === "Bookings" ? "active" : ""}`}
            onClick={() => setActiveSection("Bookings")}
          >
            kids
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
