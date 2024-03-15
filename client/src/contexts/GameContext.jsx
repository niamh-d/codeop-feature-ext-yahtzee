/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const GameContext = createContext();

const TOTAL_NUM_DICE = 5;
const NUM_ROUNDS = 13;
const NUM_ROLLS = 3;
const fixedScores = {
  fullHouseValue: 25,
  smallStraightValue: 30,
  largeStraightValue: 40,
  yahtzeeValue: 50,
};

const initialState = {
  rolledDice: [],
  diceToScore: [],
  heldDice: [],
  countRolled: 0,
  countRound: 0,
  criterionIsSelected: true,
  scoredConditions: {
    upper: [],
    lower: [],
  },
  scoringCells: {
    upper: {
      aces: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
    },
    lower: {
      threeKind: null,
      fourKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    },
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
    case "SET_SCORED_CONDITIONS":
      return {
        ...state,
        scoredConditions: [...state.scoredConditions, action.payload],
      };
    case "SET_SCORING_CELLS":
      return {
        ...state,
        scoringCells: { ...state.scoringCells, ...action.payload },
      };
    case "INCREMENT_COUNT_ROLL": {
      return { ...state, countRolled: state.countRolled + 1 };
    }
    case "SET_CRITERION_NOT_SELECTED":
      return { ...state, criterionIsSelected: false };
    case "SCORING_CRITERION_IS_SELECTED":
      return {
        ...state,
        countRolled: 0,
        countRound: state.countRound + 1,
        criterionIsSelected: true,
      };
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
      scoredConditions,
      criterionIsSelected,
      countRolled,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    calculateQualifyingScoringCells(diceToScore);
  }, [diceToScore]);

  const conditionNamesUpper = Object.keys(initialState.scoringCells.upper);
  const conditionNamesLower = Object.keys(initialState.scoringCells.lower);
  const scoredConditionNamesUpper = scoredConditions.upper.map(
    (condition) => condition.conditionName
  );
  const scoredConditionScoresUpper = scoredConditions.upper.map(
    (condition) => condition.conditionName
  );
  const scoredConditionNamesLower = scoredConditions.lower.map(
    (condition) => condition.conditionName
  );

  function upperOrLower(conditionName) {
    if (conditionNamesUpper.includes(conditionName)) return "upper";
    if (conditionNamesLower.includes(conditionName)) return "lower";
  }

  function filterDiceAndCalculateLength(dice, val) {
    return dice.filter((num) => num === val).length;
  }

  function calculateQualifyingScoringCellsUpper(dice) {
    const scores = { ...initialState.scoringCells.upper };

    const applicableConditionsUpper = conditionNamesUpper.filter(
      (condition) => !scoredConditionNamesUpper.includes(condition)
    );

    applicableConditionsUpper.forEach((condition, i) => {
      const length = filterDiceAndCalculateLength(dice, i + 1);

      if (length) scores[condition] = length * (i + 1);
    });

    return scores;
  }

  function calculateQualifyingScoringCellsLower(dice) {
    const {
      fullHouseValue,
      smallStraightValue,
      largeStraightValue,
      yahtzeeValue,
    } = fixedScores;

    const scores = { ...initialState.scoringCells.lower };
    const uniques = [...new Set(dice)];
    const uniquesLength = uniques.length;
    const sumOfRoll = dice.reduce((acc, curr) => acc + curr, 0);

    function checkForThreeOfAKind() {
      uniques.forEach((unique) => {
        const matchedLength = dice.filter((dice) => dice === unique).length;
        if (matchedLength === 3) scores["threeKind"] = sumOfRoll;
      });
    }

    function checkFor4KindAndFullHouse() {
      uniques.forEach((unique) => {
        const matchedLength = dice.filter((dice) => dice === unique).length;
        if (
          matchedLength === 4 &&
          !scoredConditionNamesLower.includes("fourKind")
        )
          scores["fourKind"] = sumOfRoll;
        if (
          matchedLength === 3 &&
          !scoredConditionNamesLower.includes("fullHouse")
        )
          scores["fullHouse"] = fullHouseValue;
      });
    }

    function checkForStraights() {
      const sortedRolledDiceStr = dice.sort().join(" ");

      if (
        (sortedRolledDiceStr.includes("1 2 3 4 5") ||
          sortedRolledDiceStr.includes("2 3 4 5 6")) &&
        !scoredConditionNamesLower.includes("largeStraight")
      )
        scores["largeStraight"] = largeStraightValue;
      if (
        (sortedRolledDiceStr.includes("1 2 3 4") ||
          sortedRolledDiceStr.includes("2 3 4 5") ||
          sortedRolledDiceStr.includes("3 4 5 6")) &&
        !scoredConditionNamesLower.includes("smallStraight")
      )
        scores["smallStraight"] = smallStraightValue;
    }

    if (!scoredConditionNamesLower.includes("chance"))
      scores["chance"] = sumOfRoll;
    if (uniquesLength === 1) scores["yahtzee"] = yahtzeeValue;
    if (uniquesLength === 2) checkFor4KindAndFullHouse();
    if (uniquesLength === 3 && !scoredConditionNamesLower.includes("threeKind"))
      checkForThreeOfAKind();
    checkForStraights();

    return scores;
  }

  function calculateQualifyingScoringCells(dice) {
    const upper = calculateQualifyingScoringCellsUpper(dice);
    const lower = calculateQualifyingScoringCellsLower(dice);

    const combinedScores = { upper, lower };

    dispatch({ type: "SET_SCORING_CELLS", payload: combinedScores });
  }

  function resetScoreCard(criterionName, score) {
    const displayedCells = { ...initialState.scoringCells };

    if (upperOrLower(criterionName) === "upper")
      displayedCells.upper[criterionName] = score;
    if (upperOrLower(criterionName) === "lower")
      displayedCells.lower[criterionName] = score;

    dispatch({ type: "SET_SCORING_CELLS", payload: displayedCells });
  }

  function scoreCriterionCell(criterionName, score) {
    resetScoreCard(criterionName, score);
    dispatch({
      type: "SET_SCORED_CONDITIONS",
      payload: { criterionName, score },
    });
    dispatch({ type: "SCORING_CRITERION_IS_SELECTED" });
  }

  function scoreUpperTotal() {
    const combinedScores = [...Object.values(scoringCells.upper)];
  }

  function rollDice() {
    const numOfDiceToRoll = TOTAL_NUM_DICE - heldDice.length;
    const rolledNewDice = [...Array(numOfDiceToRoll)].map((_) => randInt());
    const diceToScore = [...heldDice, ...rolledNewDice];

    dispatch({ type: "SET_ROLLED_DICE", payload: rolledNewDice });
    dispatch({ type: "SET_SCORED_DICE", payload: diceToScore });
    dispatch({ type: "INCREMENT_COUNT_ROLL" });
    if (countRolled === 2) dispatch({ type: "SET_CRITERION_NOT_SELECTED" });
  }

  function setDice(rolled, held) {
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
