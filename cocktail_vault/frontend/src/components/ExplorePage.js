import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useToken } from "../hooks/use-token";
import { searchRecipes, searchRecipesWithPossession } from "../api";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import "./ExplorePage.css";

const MAX_PAGES = 1000;

function ExplorePage() {
  const { term: initialTerm } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialTerm ? initialTerm : "");
  const { ref: lastItemRef, entry: lastItemEntry } = useInView();
  const [page, setPage] = useState(1);
  const numPages = useRef(MAX_PAGES);
  const token = useToken();
  const requestCount = useRef(0);
  const requestedPage = useRef(0);

  useEffect(async () => {
    const requestSequence = ++requestCount.current;
    setPage(1);
    try {
      const result = await (token
        ? searchRecipesWithPossession(searchTerm, 1, token)
        : searchRecipes(searchTerm, 1));
      if (!Array.isArray(result)) throw result;
      if (requestCount.current === requestSequence) setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, token]);

  useEffect(async () => {
    if (page == 1 || page > numPages.current) return;
    if (requestedPage.current === page) return;
    requestedPage.current = page;
    const requestSequence = ++requestCount.current;
    try {
      const result = await (token
        ? searchRecipesWithPossession(searchTerm, page, token)
        : searchRecipes(searchTerm, page));
      if (result === "Page Out of Range") {
        numPages.current = page - 1;
        return;
      } else if (!Array.isArray(result)) throw result;
      if (requestCount.current === requestSequence) setSearchResult(searchResult.concat(result));
    } catch (error) {
      console.log(error);
    }
    requestedPage.current = 0;
  }, [page, token]);

  useEffect(() => {
    if (lastItemEntry && lastItemEntry.isIntersecting) setPage(page + 1);
  }, [lastItemEntry]);

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
                <ItemCard cocktail={cocktail} key={cocktail.id} />
              ))}
          {searchResult &&
            searchResult
              .slice(-1)
              .map((cocktail) => (
                <ItemCard
                  lastItemRef={lastItemRef}
                  cocktail={cocktail}
                  key={cocktail.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
