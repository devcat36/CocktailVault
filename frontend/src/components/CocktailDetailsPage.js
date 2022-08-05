import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useToken } from "../hooks/use-token";
import { getCocktail, getCocktailWithPossessions } from "../api";
import { ingredientToString } from "../utils";
import Navbar from "./Navbar";
import "./CocktailDetailsPage.css";


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
  const token = useToken();
  const [cocktail, setCocktail] = useState(null);

  useEffect(async () => {
    if (cocktailId === undefined) return;
    try {
      if (token) {
        const response = await getCocktailWithPossessions(cocktailId, token);
        if (response.id == cocktailId) setCocktail(response);
      } else {
        const response = await getCocktail(cocktailId, token);
        if (response.id == cocktailId) setCocktail(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, cocktailId]);
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
  else
    return (
      <div className="CocktailDetailsPage">
        <Navbar />{" "}
      </div>
    );
}

export default CocktailDetailsPage;
