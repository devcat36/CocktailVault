import React from "react";
import Navbar from "./Navbar";
import { ingredientToString } from "../utils";
import "./CocktailDetailsPage.css";

const ingredients = [
  {
    ingredient: {
      id: 0,
      name: "Rum",
      hasKind: true,
      kind: "Dark",
      image: "https://picsum.photos/200",
    },
    amount: "1.5oz",
  },
  {
    ingredient: {
      id: 1,
      name: "Rum",
      hasKind: true,
      kind: "Light",
      image: "https://picsum.photos/200",
    },
    amount: "1.7oz",
  },
  {
    ingredient: {
      id: 2,
      name: "Apple",
      hasKind: false,
      kind: "",
      image: "https://picsum.photos/200",
    },
    amount: "1",
  },
];

const instructions =
  "Fill a highball glass with ice cubes. Add all ingredients. Garnish with lime and a cherry.";

const image = "https://picsum.photos/500";

const cocktail = {
  id: 0,
  name: "Rusty Nail",
  ingredients,
  instructions,
  image,
};

function ListItem({ name, amount }) {
  return (
    <li className="CocktailDetailsPage-listItem">
      <div className="name">{name}</div>
      <div className="amount">{amount}</div>
    </li>
  );
}

function IngredientsList({ title, ingredients }) {
  return (
    <div className="CocktailDetailsPage-ingredientsList">
      <h3 className="CocktailDetailsPage-listTitle">{title}</h3>
      <hr />
      <ul className="CocktailDetailsPage-list">
        {ingredients.map((item) => (
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
  return (
    <div className="CocktailDetailsPage">
      <Navbar />
      <div className="container">
        <h1 className="CocktailDetailsPage-title">{cocktail.name}</h1>
        <IngredientsList
          title="Ingredients I don't have"
          ingredients={cocktail.ingredients}
        />
        <IngredientsList
          title="Ingredients I don't have"
          ingredients={cocktail.ingredients}
        />
        <h3 className="CocktailDetailsPage-listTitle">How to make</h3>
        <hr />
        <p className="CocktailDetailsPage-instructions">
          {cocktail.instructions}
        </p>
        <h3 className="CocktailDetailsPage-listTitle">Images</h3>
        <hr />
        <div className="CocktailDetailsPage-images">
          <img src={cocktail.image} alt={cocktail.name} />
        </div>
      </div>
    </div>
  );
}

export default CocktailDetailsPage;
