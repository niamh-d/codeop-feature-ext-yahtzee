/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const GameContext = createContext();

const initialState = {
  rolledDice: [],
  heldDice: [],
  scoringCells: {
    aces: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
  },
};

const randInt = () => Math.floor(Math.random() * 6) + 1;

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLLED_DICE":
      return { ...state, rolledDice: action.payload };
    case "SET_HELD_DICE":
      return { ...state, heldDice: action.payload };
    case "SET_SCORING_CELLS":
      return { ...state, scoringCells: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function GameProvider({ children }) {
  const [{ rolledDice, heldDice }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    calculateQualifyingScoringCell(rolledDice);
  }, [rolledDice]);

  function calculateQualifyingScoringCell(rolledDice) {
    const filterDiceAndCalculateLength = (dice, val) => {
      return dice.filter((num) => num === val).length;
    };

    const scores = {};

    const conditionNames = [
      "aces",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
    ];

    conditionNames.forEach((condition, i) => {
      const length = filterDiceAndCalculateLength(rolledDice, i + 1);

      if (length) scores[`${condition}`] = length * (i + 1);
    });

    dispatch({ type: "SET_SCORING_CELLS", payload: scores });
  }

  function rollDice() {
    const diceArr = [...Array(5)].map((_) => randInt());
    dispatch({ type: "SET_ROLLED_DICE", payload: diceArr });
  }

  function setDice(rolled, held) {
    console.log(rolled, held);
    dispatch({ type: "SET_ROLLED_DICE", payload: rolled });
    dispatch({ type: "SET_HELD_DICE", payload: held });
  }

  function holdDie(index) {
    const die = rolledDice[index];
    const held = [...heldDice, die];
    const rolled = [...rolledDice].filter((num, i) => i !== index);

    setDice(rolled, held);
  }

  function returnDie(index) {
    const die = heldDice[index];
    const rolled = [...rolledDice, die];
    const held = [...heldDice].filter((num, i) => i !== index);

    setDice(rolled, held);
  }

  return (
    <GameContext.Provider
      value={{ rollDice, holdDie, returnDie, rolledDice, heldDice }}
    >
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
