import React, { useState, useEffect } from "react";
import "./Slider.css";

const slides = [
  { id: 1, image: "https://www.westside.com/cdn/shop/files/Web-DiwaliEdit.jpg?v=1760088530" },
  { id: 2, image: "https://www.westside.com/cdn/shop/files/Kurtas-Web_1.jpg?v=1758916771" },
  { id: 3, image: "https://www.westside.com/cdn/shop/files/Ethnic-Curvy-Web_1acfd049-d6ac-4d96-9089-42eee688fbb5.jpg?v=1758878139" },
   { id: 3, image: "https://www.westside.com/cdn/shop/files/Web-Man_1.jpg?v=1760099262" },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right"); // Track slide direction

  const nextSlide = () => {
    setDirection("right");
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="slider-container">
      <div className="arrow left-arrow" onClick={prevSlide}>
        &#10094;
      </div>
      <div className="arrow right-arrow" onClick={nextSlide}>
        &#10095;
      </div>
      <div className="slides-wrapper">
        {slides.map((slide, index) => {
          let className = "slide";
          if (index === current) {
            className += " active";
            className += direction === "right" ? " slide-right" : " slide-left";
          }
          return (
            <div className={className} key={slide.id}>
              <img src={slide.image} alt={`Slide ${slide.id}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
