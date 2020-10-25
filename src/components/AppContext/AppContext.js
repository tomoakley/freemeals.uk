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

    default:
      return { ...state };
  }
};

const initialState = {
  data: null,
  selectedIndex: null,
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
      payload: selectedIndex,
    });
  }

  return (
    <AppContext.Provider
      value={{
        data: state.data,
        selectedIndex: state.selectedIndex,
        setData,
        setSelectedIndex,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
