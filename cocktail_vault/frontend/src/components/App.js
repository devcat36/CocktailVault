import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ExplorePage from "./ExplorePage";
import Inventory from "./Inventory";
import CocktailDetailsPage from "./CocktailDetailsPage";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/explore'><ExplorePage /></Route>
        <Route path='/inventory'><Inventory /></Route>
        <Route path='/recipe'><CocktailDetailsPage /></Route>
        <Route path='/'><MainPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

ReactDOM.render(
  <Auth0Provider
    domain="devcat.eu.auth0.com"
    clientId="2vqJSm5n4U1hpDYZtndt3tKW7H56TUYV"
    redirectUri={window.location.origin}
    audience="cocktail_vault"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("app")
);
