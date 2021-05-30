import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import MainPage from "./MainPage";
import ExplorePage from "./ExplorePage";
import Inventory from "./Inventory";
import CocktailDetailsPage from "./CocktailDetailsPage";

function App() {
  return (
    <div className="App">
      <CocktailDetailsPage />
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
