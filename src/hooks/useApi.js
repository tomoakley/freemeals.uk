import { useEffect, useState } from "react";
import { ALL_PROVIDERS_LAMBDA, BASE_PROVIDERS_LAMBDA } from "../constants";
import { buildLocationsSet } from "../utils/buildLocationsSet";

// unsure of best place to put this in the project
// left here for now
const APIService = {
  loadAllProviders: async () => {
    const response = await fetch(ALL_PROVIDERS_LAMBDA)
    return await response.json();
  },
  loadProvidersByCoords: async ({latitude, longitude}) => {
    const response = await fetch(`${BASE_PROVIDERS_LAMBDA}?&coords=${latitude},${longitude}`);
    return await response.json();
  }
}

export const useAPI = (method, ...params) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [locations, setLocations] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      setIsLoading(true);
      const venues = await APIService[method](...params)
      setData(venues);
      // to be refactored
      setLocations(["All", ...Array.from(buildLocationsSet(venues)).sort()]);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData() }, []);

  return [ data, locations, isLoading, error, fetchData ];
};