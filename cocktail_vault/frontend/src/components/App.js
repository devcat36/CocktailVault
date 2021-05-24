import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import MainPage from "./MainPage";
import ExplorePage from "./ExplorePage";

function App() {
  return (
    <div className="App">
      <ExplorePage />
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
