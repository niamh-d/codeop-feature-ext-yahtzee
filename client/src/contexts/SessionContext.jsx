/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

const SessionContext = createContext();

const initialState = {
  loggedInUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}

function SessionProvider({ children }) {
  const [{ loggedInUser }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
  }, [loggedInUser]);

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
}

function useSession() {
  const context = useContext(SessionContext);

  if (context === undefined)
    throw new Error("SessionContext used outside of SessionProvider");
  return context;
}

export { SessionProvider, useSession };
