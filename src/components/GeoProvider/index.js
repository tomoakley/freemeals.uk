import React, { createContext } from "react";
import { geolocated } from "react-geolocated";

export const GeoContext = createContext(null);

function GeoProvider({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  children
}) {
  return (
    <GeoContext.Provider
      value={{ isGeolocationAvailable, isGeolocationEnabled, coords }}
    >
      {children}
    </GeoContext.Provider>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(GeoProvider);
