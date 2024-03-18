/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  credentialsAreInvalid: false,
  loggedInUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        credentialsAreInvalid: false,
      };
    case "SET_LOGGEDIN_USER":
      return { ...state, loggedInUser: action.payload };
    case "SIGNUP":
      return {
        ...state,
        isAuthenticated: true,
        credentialsAreInvalid: false,
      };
    case "INVALID_CREDENTIALS":
      return { ...state, credentialsAreInvalid: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Unknown action.");
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, credentialsAreInvalid, loggedInUser }, dispatch] =
    useReducer(reducer, initialState);

  async function login(email, password) {
    try {
      const res = await fetch(
        `/api/users/login?email=${email}&password=${password}`
      );
      const data = await res.json();
      const user = data[0];
      if (user) {
        dispatch({ type: "SET_LOGGEDIN_USER", payload: user });
        dispatch({ type: "LOGIN" });
      } else dispatch({ type: "INVALID_CREDENTIALS" });
    } catch (err) {
      console.error(err);
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SET_LOGGEDIN_USER", payload: null });
  }

  function signup() {
    dispatch({ type: "SIGNUP" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        credentialsAreInvalid,
        login,
        logout,
        signup,
        loggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
