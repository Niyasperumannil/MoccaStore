import React from "react";
import "./FavoriteBrands.css";

// ✅ Correct imports for Swiper v9+
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// ✅ Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const brands = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHNmtLkMs2GSP3BNDFj0W8Uggw4QF89BgcwA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5-AkkcTNySqosx-m-AOF3NsCNKwAnM3VEQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPDZjs3eMMMCRevIKdiyMMjNLaoYbhKb5tA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV0QWN1Gn0gpWxtP1lZS-nfdSCp1MX50LuFkVhRXM_g&s",
];

export default function FavoriteBrands() {
  return (
    <section className="fav-brands-section" aria-label="Favourite Brands">
      <div className="fav-brands-inner">
        <h3 className="fav-brands-title">FAVOURITE BRANDS</h3>

        <div className="brands-swiper-wrap">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={36}
            slidesPerView={7}
            freeMode={true}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 16 },
              576: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 24 },
              992: { slidesPerView: 6, spaceBetween: 28 },
              1200: { slidesPerView: 7, spaceBetween: 36 },
            }}
            className="brands-swiper"
          >
            {brands.map((src, idx) => (
              <SwiperSlide key={idx} className="brand-slide">
                <div className="brand-circle" tabIndex="0">
                  <img
                    src={src}
                    alt={`Brand logo ${idx + 1}`}
                    className="brand-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
