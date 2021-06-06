import React from "react";
import { ingredientToString } from "../utils";
import "./ItemCard.css";

function ItemCard({ cocktail, lastItemRef }) {
  let descriptionSection = ("possessed" in cocktail) ? (
    <>
      <div className="ItemCard-ingredients">
        ✓{" "}
        {cocktail.cocktailIngredients
          .filter((cocktailIngredient) =>
            cocktail.possessed.includes(cocktailIngredient.ingredient.id)
          )
          .map((cocktailIngredient) =>
            ingredientToString(cocktailIngredient.ingredient)
          )
          .join(", ")}
      </div>
      <div className="ItemCard-ingredients">
        ✘{" "}
        {cocktail.cocktailIngredients
          .filter((cocktailIngredient) =>
            !cocktail.possessed.includes(cocktailIngredient.ingredient.id)
          )
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
