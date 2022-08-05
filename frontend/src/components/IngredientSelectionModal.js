import React, { useCallback, useRef, useState } from "react";
import { useApi } from "../hooks/use-api";
import { useToken } from "../hooks/use-token";
import { addIngredient, removeIngredient } from "../api";
import SearchBar from "./SearchBar";
import IngredientItem from "./IngredientItem";
import "./IngredientSelectionModal.css";

function IngredientSelectionModal({ onClose, inventory }) {
  const api_url = "https://cocktailvault.net/api/get_all_ingredients";
  const { data: ingredients } = useApi(api_url, false);

  const [inventorySet, setInventorySet] = useState(
    new Set(inventory.map((item) => item.id))
  );
  const inventorySetRef = useRef(new Set(inventory.map((item) => item.id)));

  const token = useToken();

  const onAddItem = useCallback(
    async (id) => {
      inventorySetRef.current.add(id);
      setInventorySet(new Set(inventorySetRef.current));
      const result = await addIngredient(id, token);
      if (result === "fail") {
        inventorySetRef.current.delete(id);
        setInventorySet(new Set(inventorySetRef.current));
      }
    },
    [inventorySet, setInventorySet, token, inventorySetRef]
  );

  const onRemoveItem = useCallback(
    async (id) => {
      inventorySetRef.current.delete(id);
      setInventorySet(new Set(inventorySetRef.current));
      const result = await removeIngredient(id, token);
      if (result === "fail") {
        inventorySetRef.current.add(id);
        setInventorySet(new Set(inventorySetRef.current));
      }
    },
    [inventorySet, setInventorySet, token, inventorySetRef]
  );

  const [searchResultSet, setSearchResultSet] = useState(new Set());
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const onSearchInputChange = useCallback(
    (term) => {
      if (term.trim() === "") {
        setIsSearchEmpty(true);
        return;
      }
      setIsSearchEmpty(false);
      const termRegex = new RegExp(term, "i");
      const results = new Set();
      ingredients.forEach((ingredient) => {
        if (
          termRegex.test(ingredient.name) ||
          termRegex.test(ingredient.kind)
        ) {
          results.add(ingredient.id);
        }
      });
      setSearchResultSet(results);
    },
    [ingredients, setSearchResultSet, setIsSearchEmpty]
  );

  return (
    <div className="IngredientSelectionModal">
      <div className="IngredientSelectionModal-content">
        {ingredients && (
          <>
            <SearchBar
              placeholder="Search Ingredients.."
              onChange={(event) => onSearchInputChange(event.target.value)}
            />
            <span className="IngredientSelectionModal-title">Ingredients</span>
            <ul className="IngredientSelectionModal-list">
              {ingredients.map(
                (ingredient) =>
                  (isSearchEmpty || searchResultSet.has(ingredient.id)) && (
                    <IngredientItem
                      ingredient={ingredient}
                      have={inventorySet.has(ingredient.id)}
                      onAddItem={() => onAddItem(ingredient.id)}
                      onRemoveItem={() => onRemoveItem(ingredient.id)}
                      key={ingredient.id}
                    />
                  )
              )}
            </ul>
            <button onClick={onClose}>Done</button>
          </>
        )}
      </div>
    </div>
  );
}

export default IngredientSelectionModal;
