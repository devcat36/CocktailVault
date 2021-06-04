import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useApi } from "../hooks/use-api";
import { useToken } from "../hooks/use-token";
import { removeIngredient } from "../api";
import Navbar from "./Navbar";
import InventoryItem from "./InventoryItem";
import IngredientSelectionModal from "./IngredientSelectionModal";
import AddIcon from "@material-ui/icons/Add";
import "./Inventory.css";

function Inventory() {
  const history = useHistory();

  const api_url = "http://localhost:8000/api/get_inventory";
  const { data: inventory, refresh: refreshInventory } = useApi(api_url, true);

  const token = useToken();
  const [awaitingRemovalIngredientSet, setAwaitingRemovalIngredientSet] =
    useState(new Set());
  const awaitingRemovalIngredientSetRef = useRef(new Set());
  const onRemoveItem = useCallback(
    async (id) => {
      awaitingRemovalIngredientSetRef.current.add(id);
      setAwaitingRemovalIngredientSet(awaitingRemovalIngredientSetRef.current);
      const result = await removeIngredient(id, token);
      if (result === "success") refreshInventory();
      awaitingRemovalIngredientSetRef.current.delete(id);
      setAwaitingRemovalIngredientSet(awaitingRemovalIngredientSetRef.current);
    },
    [
      token,
      refreshInventory,
      awaitingRemovalIngredientSet,
      setAwaitingRemovalIngredientSet,
      awaitingRemovalIngredientSetRef,
    ]
  );

  const [isModalShown, setIsModalShown] = useState(false);
  const onModalClose = useCallback(() => {
    setIsModalShown(false);
    refreshInventory();
  }, [refreshInventory, setIsModalShown]);

  return (
    <div className="Inventory">
      <Navbar />
      <h2>Your Inventory</h2>
      <hr />
      {inventory && (
        <>
          <ul className="Inventory-list">
            {inventory.map((ingredient) => (
              <InventoryItem
                ingredient={ingredient}
                onRemoveItem={() => onRemoveItem(ingredient.id)}
                removing={awaitingRemovalIngredientSet.has(ingredient.id)}
                key={ingredient.id}
              />
            ))}
          </ul>
          <ul className="Inventory-buttons">
            <button onClick={() => setIsModalShown(true)}>
              <AddIcon /> Add Ingredient
            </button>
            <button onClick={() => history.push("/explore")}>
              Your Recipes
            </button>
          </ul>
          {isModalShown && (
            <IngredientSelectionModal
              inventory={inventory}
              onClose={onModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Inventory;
