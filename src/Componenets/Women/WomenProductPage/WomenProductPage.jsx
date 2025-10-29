import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WomenProductPage.css";
import LandingPageHeader from '../../LangingPageMain/LandingPageHeader/LandingPageHeader'

const WomenProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state; // Product passed from WomenCollection

  if (!product) {
    return <div className="women-product__notfound">Product not found.</div>;
  }

  return (
 <>
     <LandingPageHeader />

        <div className="women-product__wrap">
          <div className="women-product__container">
            <div className="women-product__image-section">
              <img
                src={product.image}
                alt={product.title}
                className="women-product__image"
              />
            </div>
            <div className="women-product__details">
              <h2 className="women-product__brand">{product.brand}</h2>
              <h1 className="women-product__title">{product.title}</h1>
              <p className="women-product__price">₹{product.price}</p>
              <p className="women-product__description">
                {product.description || "No description available."}
              </p>
    
              <div className="women-product__info-grid">
                <div>
                  <strong>Color:</strong> {product.color}
                </div>
                <div>
                  <strong>Fabric:</strong> {product.fabric}
                </div>
                <div>
                  <strong>Fit:</strong> {product.fit}
                </div>
                <div>
                  <strong>Size:</strong> {product.size}
                </div>
                <div>
                  <strong>Pattern:</strong> {product.pattern}
                </div>
                <div>
                  <strong>Type:</strong> {product.productType}
                </div>
              </div>
    
              <div className="women-product__actions">
                <button
                  className="women-product__backtocoll"
                  onClick={() => navigate(-1)}
                >
                  ← Back to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
 </>
  );
};

export default WomenProductPage;
