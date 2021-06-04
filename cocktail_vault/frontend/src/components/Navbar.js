import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

function Navbar() {
  const history = useHistory();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <nav className="Navbar">
      <div className="Navbar-logo" onClick={() => history.push("/")}>
        Cocktail Vault
      </div>
      <ul className="Navbar-menu">
        <li>
          <a onClick={() => history.push("/explore")}>Explore</a>
        </li>
        <li>
          <a
            onClick={() =>
              isAuthenticated ? history.push("/inventory") : loginWithRedirect()
            }
          >
            Inventory
          </a>
        </li>
        <li>
          {isAuthenticated ? (
            <a onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </a>
          ) : (
            <a onClick={() => loginWithRedirect()}>Log In</a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
