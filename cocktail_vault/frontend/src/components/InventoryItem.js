import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import "./InventoryItem.css";

function InventoryItem({ ingredient }) {
  return (
    <li className="InventoryItem">
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="InventoryItem-name">
        <span>
          {ingredient.name + (ingredient.hasKind ? `(${ingredient.kind})` : "")}
        </span>
      </div>
      <div className="InventoryItem-removeButton">
        <RemoveIcon style={{ fontSize: 35 }} />
      </div>
    </li>
  );
}

export default InventoryItem;
