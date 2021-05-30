import React, { useEffect } from "react";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  useEffect(async () => {
    const domain = "devcat.eu.auth0.com";
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `cocktail_vault`,
        scope: "read:current_user",
      });
      const response = await fetch("http://localhost:8000/api/private", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  }, []);
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">Cocktail Vault</div>
      <ul className="Navbar-menu">
        <li>Explore</li>
        <li>Inventory</li>
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
