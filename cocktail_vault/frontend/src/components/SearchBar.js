import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, onChange, onEnter }) {
  return (
    <input
      className="SearchBar"
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={(event) => {
        event.key === "Enter" && onEnter(event);
      }}
    />
  );
}

export default SearchBar;
