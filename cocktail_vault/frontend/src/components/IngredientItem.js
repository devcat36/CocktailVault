import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ingredientToString } from "../utils";
import "./IngredientItem.css";

function IngredientItem({ ingredient, have, onAddItem, onRemoveItem }) {
  return (
    <li className="IngredientItem">
      <img src={`http://172.30.1.201:9000/resize?width=60&file=ingredients/${ingredient.id}/Image_1.jpg`} alt={ingredient.name} />
      <div className="IngredientItem-name">
        <span>{ingredientToString(ingredient)}</span>
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
