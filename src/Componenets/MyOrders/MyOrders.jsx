// MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const BACKEND_URL = "https://backendmocca.onrender.com";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please log in to view your orders.");
      navigate("/register");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/orders/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Fetched orders:", data);

        // Adjust based on actual API shape
        if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.warn("Unexpected orders format:", data);
          setOrders([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div className="orders-page"><p>Loading your orders...</p></div>;
  }

  if (error) {
    return (
      <div className="orders-page">
        <p className="orders-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id || order.id} className="order-card">
            <h4>Order ID: {order._id || order.id}</h4>
            <p>Total: ₹{order.amount}</p>
            <p>Date: {new Date(order.createdAt || order.date).toLocaleString()}</p>
            <h5>Items:</h5>
            <ul>
              {(order.products || order.cartItems || []).map((item, idx) => (
                <li key={idx}>
                  {item.title} × {item.qty} — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
