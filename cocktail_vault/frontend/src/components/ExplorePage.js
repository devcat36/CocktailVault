import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import './ExplorePage.css'

const sample_cocktail = {
  name: "Rusty Nail",
  ingredients: [
    { name: "Rum", hasKind: true, kind: "Dark" },
    { name: "Scotch", hasKind: false },
    { name: "Whisky", hasKind: false },
  ],
  image: 'https://picsum.photos/500'
};

const sample_inventory = [
  { name: "Rum", hasKind: true, kind: "White" },
  { name: "Scotch", hasKind: false },
  { name: "Whisky", hasKind: false },
];

function ExplorePage() {
  return (
    <div className="ExplorePage">
      <Navbar />
      <div className="ExplorePage-container">
        <SearchBar placeholder="Search Recipes..." />
        <div className="ExplorePage-contents">
          <ItemCard
            cocktail={sample_cocktail}
            inventory={sample_inventory}
            showPossession
          />
          <ItemCard
            cocktail={sample_cocktail}
            inventory={sample_inventory}
            showPossession
          />
          <ItemCard
            cocktail={sample_cocktail}
            inventory={sample_inventory}
            showPossession
          />
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
