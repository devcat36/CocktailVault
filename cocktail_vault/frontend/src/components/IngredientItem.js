import React from "react";
import AddIcon from "@material-ui/icons/Add";
import './IngredientItem.css'

function IngredientItem({ ingredient }) {
  return (
    <li className="IngredientItem">
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="IngredientItem-name">
        <span>
          {ingredient.name + (ingredient.hasKind ? `(${ingredient.kind})` : "")}
        </span>
      </div>
      <div className="InventoryItem-removeButton">
        <AddIcon style={{ fontSize: 35 }} />
      </div>
    </li>
  );
}

export default IngredientItem;
