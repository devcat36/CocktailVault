import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (url, isProtected) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const audience = "cocktail_vault";
  useEffect(() => {
    (async () => {
      try {
        const accessToken = isProtected
          ? await getAccessTokenSilently({ audience })
          : null;
        const authHeader = {
          audience,
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await fetch(url, {
          headers: isProtected ? authHeader : null,
        });
        console.log(res);
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
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
