import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import RecommendedCard from "./RecommendedCard";
import "./MainPage.css";
import coverImage from "../media/cover_image.jpg";

const sample_title = "Kamikaze Cocktail";
const sample_image = "https://picsum.photos/400";

function MainPage() {
  return (
    <>
      <div
        className="MainPage-top"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <Navbar />
        <div className="MainPage-searchSection">
          <div className="MainPage-coverText">
            All Your Favorite Drinks Right In Here!
          </div>
          <SearchBar placeholder="Search Recipes.." />
        </div>
      </div>
      <div className="MainPage-bottom">
        <h2>Our Selections</h2>
        <ul className="MainPage-recommended">
          <RecommendedCard image={sample_image} title={sample_title} />
          <RecommendedCard image={sample_image} title={sample_title} />
          <RecommendedCard image={sample_image} title={sample_title} />
          <RecommendedCard image={sample_image} title={sample_title} />
        </ul>
      </div>
    </>
  );
}

export default MainPage;
