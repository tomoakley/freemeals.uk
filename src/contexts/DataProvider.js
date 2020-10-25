import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { GeoContext } from "../components/GeoProvider";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const { coords, isGeolocationAvailable, mode } = useContext(GeoContext);

  const getUrl = useCallback(() => {
    let url = `.netlify/functions/providers?location=${selectedLocation}`;

    if ((mode === 'geo' && isGeolocationAvailable) || mode === 'postcode') {
      if (coords) {
        url = `${url}&coords=${coords.latitude},${coords.longitude}`;
      }
    }

    /* const queryParams = []
    if (selectedLocation != null) {
      queryParams.push(`location=${selectedLocation}`)
    }

    if ((mode === 'geo' && isGeolocationAvailable) || mode === 'postcode') {
      if (coords) {
        queryParams.push(`coords=${coords.latitude},${coords.longitude}`);
      }
    }

    const url = `.netlify/functions/providers?${queryParams.join('&')}`; */

    return url;
  }, [coords, isGeolocationAvailable, selectedLocation, mode]);

  useEffect(() => {
    setFetchingData(true);
    const url = getUrl();

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        setFetchingData(false);
        const [first, ...results] = data;
        setData([first, ...results]);

        const locationSet = new Set();
        data.forEach((provider) => {
          locationSet.add(provider["provider town/city"]);
        });
        setLocations(["All", ...locationSet]);
      });
  }, [selectedLocation, getUrl]);

  return (
    <DataContext.Provider
      value={{ data, selectedLocation, setSelectedLocation, locations, fetchingData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
