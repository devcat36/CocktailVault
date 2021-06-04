import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./IngredientItem.css";

function IngredientItem({ ingredient, have, onAddItem, onRemoveItem }) {
  return (
    <li className="IngredientItem">
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="IngredientItem-name">
        <span>
          {ingredient.name + (ingredient.hasKind ? `(${ingredient.kind})` : "")}
        </span>
      </div>
      <div className="InventoryItem-removeButton">
        {have ? (
          <RemoveIcon onClick={onRemoveItem} style={{ fontSize: 35 }} />
        ) : (
          <AddIcon onClick={onAddItem} style={{ fontSize: 35 }} />
        )}
      </div>
    </li>
  );
}

export default IngredientItem;
