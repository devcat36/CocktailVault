import React from "react";
import { useApi } from "../hooks/use-api";
import SearchBar from "./SearchBar";
import IngredientItem from "./IngredientItem";
import "./IngredientSelectionModal.css";

function IngredientSelectionModal({ onClose }) {
  const api_url = "http://localhost:8000/api/get_all_ingredients";
  const { data: ingredients } = useApi(api_url, false);
  return (
    <div className="IngredientSelectionModal">
      <div className="IngredientSelectionModal-content">
        {ingredients && (
          <>
            <SearchBar placeholder="Search Ingredients.." />
            <h2>Ingredients</h2>
            <ul className="IngredientSelectionModal-list">
              {ingredients.map((ingredient) => (
                <IngredientItem ingredient={ingredient} key={ingredient.id} />
              ))}
            </ul>
            )<button onClick={onClose}>Done</button>
          </>
        )}
      </div>
    </div>
  );
}

export default IngredientSelectionModal;
