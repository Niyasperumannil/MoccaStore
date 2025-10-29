import React, { useState } from "react";
import "./AdminHome.css";
import AddMenProduct from "../AddMenProduct/AddMenProduct";
import AddWomenProduct from "../AddWomenProduct/AddWomenProduct"
import MyOrders from "../../MyOrders/MyOrders"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Doctors");

  const renderContent = () => {
    switch (activeSection) {
      case "Doctors":
        return (
          <div className="content-section">
            <h2 className="section-title">Men Management</h2>
            <p className="section-description">Here you can manage all Men.</p>
            <AddMenProduct />
          </div>
        );
      case "Reviews":
        return (
          <div className="content-section">
            <h2 className="section-title">Men Management</h2>
            <p className="section-description">Here you can manage all Men.</p>
            <AddWomenProduct />
          </div>
        );
      case "Bookings":
        return (
          <div className="content-section">
            <h2 className="section-title">Orders</h2>
            <p className="section-description">Here you can view and manage bookings.</p>
            <MyOrders />
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
            Myorders
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
