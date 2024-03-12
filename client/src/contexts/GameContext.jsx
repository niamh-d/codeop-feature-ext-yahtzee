/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

const initialState = {
  rolledDice: [],
  heldDice: [],
};

const randInt = () => Math.floor(Math.random() * 6) + 1;

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLLED_DICE":
      return { ...state, rolledDice: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function GameProvider({ children }) {
  const [{ rolledDice }, dispatch] = useReducer(reducer, initialState);

  function rollDice() {
    const diceArr = [...Array(5)].map((_) => randInt());
    dispatch({ type: "SET_ROLLED_DICE", payload: diceArr });
  }

  return (
    <GameContext.Provider value={{ rollDice, rolledDice }}>
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext was used outside the GameProvider;");
  return context;
}

export { GameProvider, useGame };
