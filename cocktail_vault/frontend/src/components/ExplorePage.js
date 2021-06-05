import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useApi } from "../hooks/use-api";
import { searchRecipes } from "../api";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import "./ExplorePage.css";

const MAX_PAGES = 1000;

function ExplorePage() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { ref: lastItemRef, entry: lastItemEntry } = useInView();
  const [page, setPage] = useState(1);
  const numPages = useRef(MAX_PAGES);

  useEffect(async () => {
    setPage(1);
    try {
      const result = await searchRecipes(searchTerm, 1);
      if (!Array.isArray(result)) throw result;
      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  useEffect(async () => {
    if (page == 1 || page > numPages.current) return;
    try {
      const result = await searchRecipes(searchTerm, page);
      if (result === "Page Out of Range") {
        numPages.current = page - 1;
        return;
      } else if (!Array.isArray(result)) throw result;
      setSearchResult(searchResult.concat(result));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    if (lastItemEntry && lastItemEntry.isIntersecting) setPage(page + 1);
  }, [lastItemEntry]);

  const inventoryApiUrl = "http://localhost:8000/api/get_inventory";
  const { data: inventory } = useApi(inventoryApiUrl, true);

  return (
    <div className="ExplorePage">
      <Navbar />
      <div className="ExplorePage-container">
        <SearchBar
          placeholder="Search Recipes..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="ExplorePage-contents">
          {searchResult &&
            searchResult
              .slice(0, -1)
              .map((cocktail) => (
                <ItemCard
                  cocktail={cocktail}
                  showPossession={inventory !== null}
                  inventory={inventory}
                  key={cocktail.id}
                />
              ))}
          {searchResult &&
            searchResult
              .slice(-1)
              .map((cocktail) => (
                <ItemCard
                  lastItemRef={lastItemRef}
                  cocktail={cocktail}
                  showPossession={inventory !== null}
                  inventory={inventory}
                  key={cocktail.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
