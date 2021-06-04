import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { ingredientToString } from "../utils";
import "./InventoryItem.css";

function InventoryItem({ ingredient, onRemoveItem }) {
  return (
    <li className="InventoryItem">
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="InventoryItem-name">
        <span>{ingredientToString(ingredient)}</span>
      </div>
      <div className="InventoryItem-removeButton">
        <RemoveIcon style={{ fontSize: 35 }} onClick={onRemoveItem} />
      </div>
    </li>
  );
}

export default InventoryItem;
