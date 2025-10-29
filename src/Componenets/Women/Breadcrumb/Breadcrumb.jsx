import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-container">
      <span className="breadcrumb-home">Home</span>
      <span className="breadcrumb-divider">/</span>
      <span className="breadcrumb-current">Women - New In</span>
    </div>
  );
};

export default Breadcrumb;
