import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import LandingPageHeader from '../../LangingPageMain/LandingPageHeader/LandingPageHeader'
import Footer from "../../LangingPageMain/Footer/Footer";

const ProductPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="product-error">
        <p>Product not found.</p>
        <button onClick={() => navigate("/men")}>Go Back</button>
      </div>
    );
  }

  return (
    <>
    <LandingPageHeader />
        <div className="product-page">
          <div className="product-container">
            <div className="product-image-wrap">
              <img src={state.image} alt={state.title} />
            </div>
    
            <div className="product-info">
              <h1>{state.title}</h1>
              <h3>{state.brand}</h3>
              <p className="product-price">₹{state.price}</p>
              <p className="product-desc">{state.description}</p>
    
              <ul className="product-details">
                <li><strong>Fabric:</strong> {state.fabric}</li>
                <li><strong>Color:</strong> {state.color}</li>
                <li><strong>Fit:</strong> {state.fit}</li>
                <li><strong>Size:</strong> {state.size}</li>
              </ul>
    
              <button className="product-btn" onClick={() => navigate(-1)}>
                ← Back to Collection
              </button>
            </div>
          </div>
        </div>
        <Footer />
    </>
  );
};

export default ProductPage;
