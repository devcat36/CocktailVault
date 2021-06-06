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

  const [waitingIconIngredientSet, setWatingIconIngredientSet] = useState(
    new Set()
  );
  const waitingIconIngredientSetRef = useRef(new Set());

  const addIngredientToWaitingIconIngredientSet = useCallback(
    (id) => {
      waitingIconIngredientSetRef.current.add(id);
      setWatingIconIngredientSet(new Set(waitingIconIngredientSetRef.current));
    },
    [waitingIconIngredientSetRef, setWatingIconIngredientSet]
  );

  const removeIngredientFromWaitingIconIngredientSet = useCallback(
    (id) => {
      waitingIconIngredientSetRef.current.delete(id);
      setWatingIconIngredientSet(new Set(waitingIconIngredientSetRef.current));
    },
    [waitingIconIngredientSetRef, setWatingIconIngredientSet]
  );

  const clearWaitingIconIngredientSet = useCallback(() => {
    waitingIconIngredientSetRef.current = new Set();
    setWatingIconIngredientSet(new Set());
  }, [waitingIconIngredientSetRef, setWatingIconIngredientSet]);

  const onRemoveItem = useCallback(
    async (id) => {
      addIngredientToWaitingIconIngredientSet(id);
      const result = await removeIngredient(id, token);
      if (result === "success") refreshInventory();
      else removeIngredientFromWaitingIconIngredientSet(id);
    },
    [
      token,
      refreshInventory,
      addIngredientToWaitingIconIngredientSet,
      removeIngredientFromWaitingIconIngredientSet,
    ]
  );

  const [isModalShown, setIsModalShown] = useState(false);
  const onModalClose = useCallback(() => {
    setIsModalShown(false);
    clearWaitingIconIngredientSet();
    refreshInventory();
  }, [refreshInventory, setIsModalShown, clearWaitingIconIngredientSet]);
  return (
    <div className="Inventory">
      <Navbar />
      <h2>Your Inventory</h2>
      <hr />
      {Array.isArray(inventory) && (
        <>
          <ul className="Inventory-list">
            {inventory.map((ingredient) => (
              <InventoryItem
                ingredient={ingredient}
                onRemoveItem={() => onRemoveItem(ingredient.id)}
                removing={waitingIconIngredientSet.has(ingredient.id)}
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
