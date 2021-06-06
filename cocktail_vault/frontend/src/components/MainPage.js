import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import RecommendedCard from "./RecommendedCard";
import "./MainPage.css";
import coverImage from "../media/cover_image.jpg";
import { useApi } from "../hooks/use-api";

function MainPage() {
  const history = useHistory();
  const { data: cocktails } = useApi(
    "http://localhost:8000/api/get_random_cocktails",
    false
  );
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
          <SearchBar
            placeholder="Search Recipes.."
            onEnter={(event) => history.push(`/explore/${event.target.value}`)}
          />
        </div>
      </div>
      <div className="MainPage-bottom">
        <h2>Our Selections</h2>
        <ul className="MainPage-recommended">
          {cocktails &&
            cocktails.map((cocktail) => (
              <RecommendedCard
                image={`http://172.30.1.201:9000/resize?width=238&file=cocktails/${cocktail.id}/Image_1.jpg`}
                title={cocktail.name}
                onClick={() => history.push(`/recipe/${cocktail.id}`)}
                key={cocktail.id}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default MainPage;
