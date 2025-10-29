import React, { useEffect, useState } from "react";
import "./MoccaLoader.css";

const MoccaLoader = () => {
  const letters = ["M", "O", "C", "C", "A"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % letters.length);
    }, 200);
    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <div className="loader-container">
      <div className="mocca-logo">
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`letter ${i === activeIndex ? "active" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MoccaLoader;
