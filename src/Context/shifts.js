import React, { useReducer } from "react";
// import { getApplicationByApplicationId } from "../Utils/apiServices";

export const initialState = {
  shifts: [],
  availableShifts: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.payload,
      };

    case "replace":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export const ShiftContext = React.createContext();

export const ShiftContextProvider = (props) => {
  const [shiftState, shiftDispatch] = useReducer(reducer, initialState);

  return (
    <ShiftContext.Provider
      value={{
        shiftState,
        shiftDispatch,
      }}
    >
      {props.children}
    </ShiftContext.Provider>
  );
};

export const useShiftContext = () => {
  const context = React.useContext(ShiftContext);

  if (!context) {
    throw new Error("useShiftContext within provider");
  }

  return context;
};
