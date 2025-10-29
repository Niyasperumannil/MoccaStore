import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./KidsProductPage.css";
import LandingPageHeader from '../../LangingPageMain/LandingPageHeader/LandingPageHeader'
import Footer from "../../LangingPageMain/Footer/Footer";

const KidsProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return <div className="kids-product__notfound">Product not found.</div>;
  }

  return (
   <>
       <LandingPageHeader />

        <div className="kids-product__wrap">
          <div className="kids-product__container">
            <div className="kids-product__image-section">
              <img
                src={product.image}
                alt={product.title}
                className="kids-product__image"
              />
            </div>
    
            <div className="kids-product__details">
              <h2 className="kids-product__brand">{product.brand}</h2>
              <h1 className="kids-product__title">{product.title}</h1>
              <p className="kids-product__price">₹{product.price}</p>
              <p className="kids-product__description">
                {product.description || "No description available."}
              </p>
    
              <div className="kids-product__info-grid">
                <div><strong>Color:</strong> {product.color}</div>
                <div><strong>Fabric:</strong> {product.fabric}</div>
                <div><strong>Fit:</strong> {product.fit}</div>
                <div><strong>Size:</strong> {product.size}</div>
                <div><strong>Pattern:</strong> {product.pattern}</div>
                <div><strong>Type:</strong> {product.productType}</div>
              </div>
    
              <div className="kids-product__actions">
                <button
                  className="kids-product__back"
                  onClick={() => navigate("/kids")}
                >
                  ← Back to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
   </>
  
  );
};

export default KidsProductPage;
