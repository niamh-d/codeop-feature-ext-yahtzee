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
    case "SET_LOGGEDIN_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}

function AuthProvider({ children }) {
  const [{ loggedInUser }, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const results = await fetch("/api/login", options);
      const data = await results.json();

      if (data) {
        dispatch({ type: "SET_LOGGEDIN_USER", payload: data.userDetails });
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function signup(details) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      const res = await fetch("/api/users", options);
      const user = await res.json();
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        loggedInUser,
        signup,
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
