import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "../hooks/use-api";
import { ingredientToString } from "../utils";
import Navbar from "./Navbar";
import "./CocktailDetailsPage.css";
import { useAuth0 } from "@auth0/auth0-react";

function ListItem({ name, amount }) {
  return (
    <li className="CocktailDetailsPage-listItem">
      <div className="name">{name}</div>
      <div className="amount">{amount}</div>
    </li>
  );
}

function IngredientsList({ title, cocktailIngredients }) {
  return (
    <div className="CocktailDetailsPage-ingredientsList">
      <h3 className="CocktailDetailsPage-listTitle">{title}</h3>
      <hr />
      <ul className="CocktailDetailsPage-list">
        {cocktailIngredients.map((item) => (
          <ListItem
            name={ingredientToString(item.ingredient)}
            amount={item.amount}
            key={item.ingredient.id}
          />
        ))}
      </ul>
    </div>
  );
}

function CocktailDetailsPage() {
  const { cocktailId } = useParams();
  const { isAuthenticated } = useAuth0();
  const {
    loading,
    data: cocktail,
    setParams,
  } = useApi(
    `https://cocktailvault.net/api/get_cocktail?id=${cocktailId}`,
    false
  );

  useEffect(() => {
    if (isAuthenticated)
      setParams(
        `https://cocktailvault.net/api/get_cocktail_with_possessions?id=${cocktailId}`,
        true
      );
    else
      setParams(
        `https://cocktailvault.net/api/get_cocktail?id=${cocktailId}`,
        false
      );
  }, [isAuthenticated, cocktailId]);

  if (cocktail)
    return (
      <div className="CocktailDetailsPage">
        <Navbar />
        <div className="container">
          <h1 className="CocktailDetailsPage-title">{cocktail.name}</h1>
          {"possessed" in cocktail ? (
            <>
              <IngredientsList
                title="Ingredients I have"
                cocktailIngredients={cocktail.cocktailIngredients.filter(
                  (cocktailIngredient) =>
                    cocktail.possessed.includes(
                      cocktailIngredient.ingredient.id
                    )
                )}
              />
              <IngredientsList
                title="Ingredients I don't have"
                cocktailIngredients={cocktail.cocktailIngredients.filter(
                  (cocktailIngredient) =>
                    !cocktail.possessed.includes(
                      cocktailIngredient.ingredient.id
                    )
                )}
              />
            </>
          ) : (
            <IngredientsList
              title="Ingredients"
              cocktailIngredients={cocktail.cocktailIngredients}
            />
          )}
          <h3 className="CocktailDetailsPage-listTitle">How to make</h3>
          <hr />
          <p className="CocktailDetailsPage-instructions">
            {cocktail.instructions}
          </p>
          <h3 className="CocktailDetailsPage-listTitle">Images</h3>
          <hr />
          <div className="CocktailDetailsPage-images">
            <img
              src={`https://cdn.cocktailvault.net/resize?width=300&file=cocktails/${cocktail.id}/Image_1.jpg`}
              alt={cocktail.name}
            />
          </div>
        </div>
      </div>
    );
  else if (loading)
    return (
      <div className="CocktailDetailsPage">
        <Navbar />
        Loading...
      </div>
    );
  else
    return (
      <div className="CocktailDetailsPage">
        <Navbar />
        Recipe not found.
      </div>
    );
}

export default CocktailDetailsPage;
