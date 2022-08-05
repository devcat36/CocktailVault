import React from "react";
import { useHistory } from "react-router-dom";
import { ingredientToString } from "../utils";
import "./ItemCard.css";

function ItemCard({ cocktail, lastItemRef }) {
  const history = useHistory();
  let descriptionSection =
    "possessed" in cocktail ? (
      <>
        {cocktail.possessed.length > 0 && (
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
        )}
        {cocktail.not_possessed.length > 0 && (
          <div className="ItemCard-ingredients">
            ✘{" "}
            {cocktail.cocktailIngredients
              .filter(
                (cocktailIngredient) =>
                  !cocktail.possessed.includes(cocktailIngredient.ingredient.id)
              )
              .map((cocktailIngredient) =>
                ingredientToString(cocktailIngredient.ingredient)
              )
              .join(", ")}
          </div>
        )}
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
    <div
      className="ItemCard"
      ref={lastItemRef}
      onClick={() => history.push(`/recipe/${cocktail.id}`)}
    >
      <img
        src={`https://cdn.cocktailvault.net/resize?width=200&file=cocktails/${cocktail.id}/Image_1.jpg`}
        alt={cocktail.name}
      />
      <div className="ItemCard-details">
        <div className="ItemCard-title">{cocktail.name}</div>
        {descriptionSection}
      </div>
    </div>
  );
}

export default ItemCard;
