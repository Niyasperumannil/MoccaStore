import React from "react";
import { Link } from "react-router-dom";
import "./ShopByCategory.css";

const categories = [
  {
    title: "Men",
    discount: "30-80% OFF",
    img: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301037297NAVY_1_800x.jpg?v=1760612187",
    link: "/men",
  },
  {
    title: "Women",
    discount: "40-80% OFF",
    img: "https://www.westside.com/cdn/shop/files/Woman-Web-Nav_7a842709-a782-4e4c-a45e-3af43e11af38.jpg?v=1758872564&width=2000",
    link: "/women",
  },
  {
    title: "Kids",
    discount: "30-70% OFF",
    img: "https://www.westside.com/cdn/shop/files/Kids-Web-Nav_1.jpg?v=1758872652&width=2000",
    link: "/kids",
  },
  {
    title: "Beauty",
    discount: "25-70% OFF",
    img: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301036926001_1_800x.jpg?v=1758794510",
    link: "/shop/beauty",
  },
];

export default function ShopByCategory() {
  return (
    <section className="shop-section">
      <h2 className="shop-title">SHOP BY CATEGORY</h2>

      <div className="shop-row">
        {categories.map((item, index) => (
          <Link to={item.link} key={index} className="shop-card">
            <img src={item.img} alt={item.title} className="shop-image" />
            <div className="shop-overlay">
              <h3>{item.title}</h3>
              <p>{item.discount}</p>
              <button>Shop Now</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
