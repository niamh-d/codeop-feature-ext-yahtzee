/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

const SessionContext = createContext();

import { useAuth } from "./AuthContext";

const initialState = {
  currentUser: null,
  pastPlays: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAST_PLAYS":
      return { ...state, pastPlays: action.payload };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}

function SessionProvider({ children }) {
  const [{ currentUser }, dispatch] = useReducer(reducer, initialState);

  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser)
      dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
    if (!loggedInUser) dispatch({ type: "SET_CURRENT_USER", payload: null });
  }, [loggedInUser]);

  useEffect(() => {
    if (!currentUser) return;

    getPastPlays();
  }, [currentUser]);

  async function getPastPlays() {
    try {
      const id = currentUser.id;
      const res = await fetch(`/api/plays?id=${id}`);
      const data = await res.json();
      if (data) dispatch({ type: "SET_PAST_PLAYS", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  async function savePlayDetails(play) {
    try {
      play.userId = currentUser.id;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(play),
      };
      const res = await fetch("/api/plays", options);
      const data = await res.json();
      if (data) getPastPlays();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SessionContext.Provider value={{ savePlayDetails, currentUser }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const context = useContext(SessionContext);

  if (context === undefined)
    throw new Error("SessionContext used outside of SessionProvider");
  return context;
}

export { SessionProvider, useSession };
