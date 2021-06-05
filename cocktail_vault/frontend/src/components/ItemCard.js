import React from "react";
import { ingredientToString } from "../utils";
import "./ItemCard.css";

const getIngredientsHave = (ingredients, inventory) => {
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

function ItemCard({ cocktail, showPossession, inventory, lastItemRef }) {
  let descriptionSection = showPossession ? (
    <>
      <div className="ItemCard-ingredients">
        ✓{" "}
        {getIngredientsHave(cocktail.cocktailIngredients, inventory)
          .map((cocktailIngredient) =>
            ingredientToString(cocktailIngredient.ingredient)
          )
          .join(", ")}
      </div>
      <div className="ItemCard-ingredients">
        ✘{" "}
        {getIngredientsNotHave(cocktail.cocktailIngredients, inventory)
          .map((cocktailIngredient) =>
            ingredientToString(cocktailIngredient.ingredient)
          )
          .join(", ")}
      </div>
    </>
  ) : (
    <div className="ItemCard-ingredients">
      {cocktail.cocktailIngredients
        .map((cocktailIngredient) =>
          ingredientToString(cocktailIngredient.ingredient)
        )
        .join(", ")}
    </div>
  );
  return (
    <div className="ItemCard" ref={lastItemRef}>
      <img src={cocktail.image} alt={cocktail.name} />
      <div className="ItemCard-details">
        <div className="ItemCard-title">{cocktail.name}</div>
        {descriptionSection}
      </div>
    </div>
  );
}

export default ItemCard;
