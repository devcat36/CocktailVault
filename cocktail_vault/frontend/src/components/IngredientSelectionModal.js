import React from "react";
import SearchBar from "./SearchBar";
import IngredientItem from "./IngredientItem";
import "./IngredientSelectionModal.css";

const ingredients = [
  {
    id: 0,
    name: "Rum",
    hasKind: true,
    kind: "Dark",
    image: "https://picsum.photos/200",
  },
  {
    id: 1,
    name: "Coke",
    hasKind: false,
    kind: "",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Vodka",
    hasKind: false,
    kind: "",
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    name: "Sugar",
    hasKind: false,
    kind: "",
    image: "https://picsum.photos/200",
  },
];

function IngredientSelectionModal() {
  return (
    <div className="IngredientSelectionModal">
      <div className="IngredientSelectionModal-content">
        <SearchBar placeholder="Search Ingredients.." />
        <h2>Ingredients</h2>
        <ul className="IngredientSelectionModal-list">
          {ingredients.map((ingredient) => (
            <IngredientItem ingredient={ingredient} key={ingredient.id} />
          ))}
        </ul>
        <button>Done</button>
      </div>
    </div>
  );
}

export default IngredientSelectionModal;
