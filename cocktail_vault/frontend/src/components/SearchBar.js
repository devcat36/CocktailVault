import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, onChange }) {
  return (
    <input
      className="SearchBar"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default SearchBar;
