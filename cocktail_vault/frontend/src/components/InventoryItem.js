import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { ingredientToString } from "../utils";
import "./InventoryItem.css";

function InventoryItem({ ingredient, onRemoveItem, removing }) {
  return (
    <li className="InventoryItem">
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="InventoryItem-name">
        <span>{ingredientToString(ingredient)}</span>
      </div>
      <div className="InventoryItem-removeButton">
        {!removing ? (
          <RemoveIcon style={{ fontSize: 35 }} onClick={onRemoveItem} />
        ) : (
          <HourglassEmptyIcon style={{ fontSize: 35 }} />
        )}
      </div>
    </li>
  );
}

export default InventoryItem;
