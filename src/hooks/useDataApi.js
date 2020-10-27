
import { useEffect, useState, useRef } from "react";

export const useDataApi = () => {
  const firstUpdate = useRef(true);
  const [apiUrl, setApiUrl] = useState("");
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      // prevents fetching on initial render
      if (!firstUpdate.current) {
        setFetching(true);
        fetch(apiUrl)
          .then(response => response.json())
          .then(response => {
            setData(response);
            setFetching(false)
          })
          .catch(error => {
            setError(true);
          });
      }
      firstUpdate.current = false;
    },
    // Only changes to apiUrl cause a re-render (fetch)
    // eg. callApi(URL)
    [apiUrl]
  );
  return { data, error, fetching, callApi: setApiUrl };
};