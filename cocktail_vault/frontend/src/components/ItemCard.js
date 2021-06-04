import React from "react";
import { ingredientToString } from "../utils";
import "./ItemCard.css";

const getingredientsHave = (ingredients, inventory) => {
  return ingredients.filter((ingredient) => {
    if (ingredient.hasKind)
      return inventory.some(
        (item) => item.name === ingredient.name && item.kind === ingredient.kind
      );
    else return inventory.some((item) => item.name === ingredient.name);
  });
};

const getIngredientsNotHave = (ingredients, inventory) => {
  return ingredients.filter((ingredient) => {
    if (ingredient.hasKind)
      return !inventory.some(
        (item) => item.name === ingredient.name && item.kind === ingredient.kind
      );
    else return !inventory.some((item) => item.name === ingredient.name);
  });
};

function ItemCard({ cocktail, showPossession, inventory }) {
  return (
    <div className="ItemCard">
      <img src={cocktail.image} alt={cocktail.name} />
      <div className="ItemCard-details">
        <div className="ItemCard-title">{cocktail.name}</div>
        {showPossession && (
          <div className="ItemCard-ingredients">
            ✓{" "}
            {getingredientsHave(cocktail.ingredients, inventory)
              .map((ingredient) => ingredientToString(ingredient))
              .join(", ")}
          </div>
        )}
        {showPossession && (
          <div className="ItemCard-ingredients">
            ✘{" "}
            {getIngredientsNotHave(cocktail.ingredients, inventory)
              .map((ingredient) => ingredientToString(ingredient))
              .join(", ")}
          </div>
        )}
        {!showPossession && (
          <div className="ItemCard-ingredients">
            {cocktail.ingredients.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
