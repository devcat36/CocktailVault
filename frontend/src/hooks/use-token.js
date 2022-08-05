import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function useToken() {
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const getToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: "cocktail_vault",
      });
      setToken(accessToken);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return token;
}