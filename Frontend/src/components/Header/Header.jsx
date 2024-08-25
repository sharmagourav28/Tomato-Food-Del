import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
          Explore curated lists of top restaurants, cafes, pubs, and bars in
          Indore, based on trends
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
