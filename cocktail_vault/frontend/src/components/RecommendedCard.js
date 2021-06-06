import React from "react";
import "./RecommendedCard.css";

function RecommendedCard({ image, title, onClick }) {
  return (
    <li
      className="RecommendedCard"
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      <div className="RecommendedCard-title">
        <span>{title}</span>
      </div>
    </li>
  );
}

export default RecommendedCard;
