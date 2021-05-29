import React from "react";
import Navbar from "./Navbar";
import InventoryItem from "./InventoryItem";
import IngredientSelectionModal from "./IngredientSelectionModal"
import AddIcon from "@material-ui/icons/Add";
import "./Inventory.css";

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

function Inventory() {
  return (
    <>
      <div className="Inventory">
        <Navbar />
        <h2>Your Inventory</h2>
        <hr />
        <ul className="Inventory-list">
          {ingredients.map((ingredient) => (
            <InventoryItem ingredient={ingredient} key={ingredient.id} />
          ))}
        </ul>
        <ul className="Inventory-buttons">
          <button>
            <AddIcon /> Add Ingredient
          </button>
          <button>Your Recipes</button>
        </ul>
      </div>
      <IngredientSelectionModal />
    </>
  );
}

export default Inventory;
