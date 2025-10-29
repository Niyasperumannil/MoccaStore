// App.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Hero from "./Pages/Hero";
import MenHomePage from "./Pages/MenHomePage/MenHomePage";
import WomenHomePage from "./Pages/WomenHomePage/WomenHomePage";
import KidsHomePage from "./Pages/KidsHomePage/KidsHomePage";
import MoccaLoader from "./Componenets/MoccaLoader/MoccaLoader";
import ProductPage from "./Componenets/Men/ProductPage/ProductPage";
import WomenProductPage from "./Componenets/Women/WomenProductPage/WomenProductPage";
import KidsProductPage from "./Componenets/Kids/KidsProductPage/KidsProductPage";
import RegisterHome from "./Componenets/Register/RegisterHome/RegisterHome";
import ProfileDetails from "./Componenets/Register/ProfileDetails/ProfileDetails";
import LandingPageHomePage from "./Pages/LandingPageHomePage/LandingPageHomePage";
import AdminHome from "./Componenets/Admin/AdminHome/AdminHome";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigationGuardRef = useRef(false); // prevents repeated navigations
  const navigate = useNavigate();

  useEffect(() => {
    // loader simulation
    const timer = setTimeout(() => setLoading(false), 1500);

    // initial auth check (run once)
    const token = localStorage.getItem("userToken");
    if (token) setIsAuthenticated(true);

    return () => clearTimeout(timer);
  }, []);

  // Keep auth state in sync if another tab updates localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "userToken") {
        setIsAuthenticated(!!e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Called by child after successful registration/login
  const handleRegisterSuccess = useCallback(() => {
    // debounce/guard to prevent multiple navigations
    if (navigationGuardRef.current) return;
    navigationGuardRef.current = true;

    setIsAuthenticated(true);
    // navigate once; replace avoids history spam
    navigate("/profile-details", { replace: true });

    // release the guard after a short time (so subsequent legitimate navigations can occur)
    setTimeout(() => {
      navigationGuardRef.current = false;
    }, 1000);
  }, [navigate]);

  return (
    <>
      {loading ? (
        <MoccaLoader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/landing" /> : <Hero />}
          />

          <Route path="/landing" element={<LandingPageHomePage />} />

          <Route path="/men" element={<MenHomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/women" element={<WomenHomePage />} />
          <Route path="/women/product/:id" element={<WomenProductPage />} />
          <Route path="/kids" element={<KidsHomePage />} />
          <Route path="/kids/product/:id" element={<KidsProductPage />} />

          <Route path="/Admindashboard" element={<AdminHome />} />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/profile-details" />
              ) : (
                // pass the handler to the component
                <RegisterHome onRegisterSuccess={handleRegisterSuccess} />
              )
            }
          />

          <Route
            path="/profile-details"
            element={
              isAuthenticated ? <ProfileDetails /> : <Navigate to="/register" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
