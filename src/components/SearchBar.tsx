import React from "react";
import { Link } from "react-router-dom";
import "../css/Main.css";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <Link to="/destinationChooser" className="search-link">
        <input type="text" placeholder="Hvor vil du dra?" />
      </Link>
    </div>
  );
};

export default SearchBar;
