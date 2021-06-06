import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (url, isProtected) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [apiUrl, setApiUrl] = useState(url);

  const audience = "cocktail_vault";
  useEffect(() => {
    (async () => {
      try {
        const accessToken = (isProtected && isAuthenticated)
          ? await getAccessTokenSilently({ audience })
          : null;
        const authHeader = {
          audience,
          Authorization: `Bearer ${accessToken}`,
        };
        const res = (isProtected && isAuthenticated)
          ? await fetch(apiUrl, {
              headers: authHeader,
            })
          : await fetch(apiUrl);
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, [refreshIndex, apiUrl]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
    setUrl : (url) => setApiUrl(url)
  };
};
