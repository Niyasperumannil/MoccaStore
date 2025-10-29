import React from "react";
// Swiper and SwiperSlide come from 'swiper/react'
import { Swiper, SwiperSlide } from "swiper/react"; 
// Navigation and Pagination (the modules) come from 'swiper'
import { Navigation, Pagination } from "swiper/modules"; // ✅ Correct for modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./BrandsCarousel.css";

const brands = [
  { image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301035969MINT_1_800x.jpg?v=1760612126", alt: "Invictus & Dennison – Work-Ready Styles Min. 70% OFF" },
  { image: "https://www.westside.com/cdn/shop/files/Man-Web-Nav.jpg?v=1758872621&width=2000", alt: "Raymond & Blackberrys – Work-Ready Styles Min. 55% OFF" },
  { image: "https://www.westside.com/cdn/shop/files/Kids-Web-Nav_1.jpg?v=1758872652&width=2000", alt: "Arrow / Peter England – Smart Workwear Min. 50% OFF" },
  { image: "https://www.westside.com/cdn/shop/files/NUON-WEB-NAV_1.jpg?v=1757939848&width=2000", alt: "Louis Philippe / Allen Solly – Work-Ready Styles 30-50% OFF" },
  { image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/converted15_800x.jpg?v=1754665149", alt: "Levi’s / Calvin Klein – Bestselling Casuals Min. 30% OFF" },
  { image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301030182BLACK_1_800x.jpg?v=1760520840", alt: "boohooMAN / NEXT – Elevated Picks Min. 25% OFF" },
];

export default function BrandsCarousel() {
  return (
    <section className="brands-section">
      <h2 className="brands-title">MEDAL WORTHY BRANDS TO BAG</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1200: { slidesPerView: 6, spaceBetween: 30 },
          768: { slidesPerView: 4, spaceBetween: 25 },
          0: { slidesPerView: 3, spaceBetween: 15 },
        }}
        className="brands-swiper"
      >
        {brands.map((brand, idx) => (
          <SwiperSlide key={idx} className="brand-slide">
            <div className="brand-card">
              <img src={brand.image} alt={brand.alt} className="brand-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}