// @ts-nocheck
import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };

    case "SET_SELECTED_INDEX":
      return {
        ...state,
        selectedIndex: action.payload,
      };

    case "SET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      }

    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      }

    default:
      return { ...state };
  }
};

const initialState = {
  data: null,
  selectedIndex: null,
  locations: null,
  selectedLocation: 'All',
};

export const AppContext = React.createContext(initialState);

const AppContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function setData(data) {
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  }

  function setSelectedIndex(selectedIndex) {
    dispatch({
      type: "SET_SELECTED_INDEX",
      payload: selectedIndex != null ? Number(selectedIndex) : null,
    });
  }

  function setLocations(locations) {
    dispatch({
      type: "SET_LOCATIONS",
      payload: locations,
    })
  }

  function setSelectedLocation(selectedLocation) {
    dispatch({
      type: "SET_SELECTED_LOCATION",
      payload: selectedLocation
    })
  }

  return (
    <AppContext.Provider
      value={{
        data: state.data,
        locations: state.locations,
        selectedIndex: state.selectedIndex,
        selectedLocation: state.selectedLocation,
        setData,
        setLocations,
        setSelectedIndex,
        setSelectedLocation,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
