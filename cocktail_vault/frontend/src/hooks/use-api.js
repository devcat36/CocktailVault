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
  const [params, setParams] = useState({url, isProtected});

  const audience = "cocktail_vault";
  useEffect(() => {
    (async () => {
      try {
        const accessToken = params.isProtected
          ? await getAccessTokenSilently({ audience })
          : null;
        const authHeader = {
          audience,
          Authorization: `Bearer ${accessToken}`,
        };
        const res = params.isProtected
          ? await fetch(params.url, {
              headers: authHeader,
            })
          : await fetch(params.url);
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
  }, [refreshIndex, params]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
    setParams : (params) => setParams(params)
  };
};
