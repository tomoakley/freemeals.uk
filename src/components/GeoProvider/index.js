import React, { createContext, useState, useEffect } from "react";
import { geolocated } from "react-geolocated";

export const GeoContext = createContext(null);

function GeoProvider({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords: geoCoords,
  children,
}) {
  const [mode, setMode] = useState({name: "geo", coords: geoCoords});
  const [coords, setCoords] = useState(geoCoords);

  useEffect(() => {
    const switchMode = () => {
      switch (mode.name) {
        case "geo":
          setCoords(geoCoords);
          break;
        case "postcode":
          setCoords(mode.coords);
          break;
        default:
          setCoords(null)
          break
      }
    };
    switchMode();
  }, [mode, geoCoords]);

  return (
    <GeoContext.Provider
      value={{
        isGeolocationAvailable,
        isGeolocationEnabled,
        coords,
        mode: mode.name,
        setMode,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoProvider);
