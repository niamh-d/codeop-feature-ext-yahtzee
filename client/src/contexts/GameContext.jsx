/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const GameContext = createContext();

const TOTAL_NUM_DICE = 5;
const NUM_ROUNDS = 13;
const NUM_ROLLS = 3;

const initialState = {
  rolledDice: [],
  diceToScore: [],
  heldDice: [],
  countRolled: 0,
  countRound: 0,
  criterionIsSelected: true,
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
    case "SET_SCORED_DICE":
      return { ...state, diceToScore: action.payload };
    case "SET_SCORING_CELLS":
      return {
        ...state,
        scoringCells: { ...initialState.scoringCells, ...action.payload },
      };
    case "INCREMENT_COUNT_ROLL": {
      return { ...state, countRolled: state.countRolled + 1 };
    }
    case "TOGGLE_CRITERIA_SELECTED":
      return { ...state, criterionIsSelected: !state.criterionIsSelected };
    default:
      throw new Error("Unknown action type");
  }
}

function GameProvider({ children }) {
  const [
    {
      rolledDice,
      heldDice,
      diceToScore,
      scoringCells,
      criterionIsSelected,
      countRolled,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    calculateQualifyingScoringCell(diceToScore);
  }, [diceToScore]);

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

      if (length) scores[condition] = length * (i + 1);
    });

    dispatch({ type: "SET_SCORING_CELLS", payload: scores });
  }

  function scoreCriterionCell(criterionName, score) {
    const cells = { ...initialState.scoringCells };
    cells[criterionName] = score;

    dispatch({ type: "SET_SCORING_CELLS", payload: cells });
    dispatch({ type: "TOGGLE_CRITERIA_SELECTED" });
  }

  function rollDice() {
    const numOfDiceToRoll = TOTAL_NUM_DICE - heldDice.length;
    const rolledDice = [...Array(numOfDiceToRoll)].map((_) => randInt());
    const diceToScore = [...heldDice, ...rolledDice];
    dispatch({ type: "SET_ROLLED_DICE", payload: rolledDice });
    dispatch({ type: "SET_SCORED_DICE", payload: diceToScore });
    dispatch({ type: "INCREMENT_COUNT_ROLL" });
    if (countRolled === 2) dispatch({ type: "TOGGLE_CRITERIA_SELECTED" });
  }

  function setDice(rolled, held) {
    console.log(rolled, held);
    dispatch({ type: "SET_ROLLED_DICE", payload: rolled });
    dispatch({ type: "SET_HELD_DICE", payload: held });
  }

  function holdDie(index) {
    const die = rolledDice[index];
    const held = [...heldDice, die];
    const rolled = [...rolledDice].filter((_, i) => i !== index);

    setDice(rolled, held);
  }

  function returnDie(index) {
    const die = heldDice[index];
    const rolled = [...rolledDice, die];
    const held = [...heldDice].filter((_, i) => i !== index);

    setDice(rolled, held);
  }

  return (
    <GameContext.Provider
      value={{
        rollDice,
        holdDie,
        returnDie,
        scoreCriterionCell,
        rolledDice,
        heldDice,
        scoringCells,
        criterionIsSelected,
      }}
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