/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

import {
  initialState,
  fixedScoresAndBonuses,
  TOTAL_NUM_DICE,
  NUM_ROLLS,
} from "../data/data";
import {
  randInt,
  sumUp,
  filterDiceAndCalculateLength,
  renderSortedRolledDiceStr,
  calculateMatchedLength,
} from "../utilities/functions";
import reducer from "../utilities/reducer";

const GameContext = createContext();

function GameProvider({ children }) {
  const [
    {
      gameIsEnded,
      rolledDice,
      heldDice,
      diceToScore,
      scoringCells,
      scoredConditions,
      scoredTotalsAndBonuses,
      criterionIsSelected,
      countRolled,
      isScoreable,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // SET-UP AND SCORED CONDITION NAMES AND SCORES

  const conditionNamesUpper = Object.keys(initialState.scoringCells.upper);
  const conditionNamesLower = Object.keys(initialState.scoringCells.lower);

  function returnScoredConditionNamesAndScores(scoredConditions, nameOrScore) {
    return scoredConditions.map((condition) => condition[nameOrScore]);
  }

  const scoredConditionNamesUpper = returnScoredConditionNamesAndScores(
    scoredConditions.upper,
    "criterionName"
  );
  const scoredConditionScoresUpper = returnScoredConditionNamesAndScores(
    scoredConditions.upper,
    "score"
  );
  const scoredConditionNamesLower = returnScoredConditionNamesAndScores(
    scoredConditions.lower,
    "criterionName"
  );
  const scoredConditionScoresLower = returnScoredConditionNamesAndScores(
    scoredConditions.lower,
    "score"
  );

  // DICE ACTIONS

  function rollDice() {
    const numOfDiceToRoll = TOTAL_NUM_DICE - heldDice.length;
    const rolledNewDice = [...Array(numOfDiceToRoll)].map((_) => randInt());
    const diceToScore = [...heldDice, ...rolledNewDice];

    dispatch({ type: "SET_ROLLED_DICE", payload: rolledNewDice });
    dispatch({ type: "SET_SCORED_DICE", payload: diceToScore });
    dispatch({ type: "INCREMENT_COUNT_ROLL" });
    if (countRolled === NUM_ROLLS - 1)
      dispatch({ type: "SET_CRITERION_NOT_SELECTED" });
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

  // END GAME

  function endGameEarly() {
    dispatch({ type: "END_GAME" });
  }

  // END GAME SCORING

  useEffect(() => {
    if (!scoredConditionNamesLower.length && !scoredConditionNamesUpper.length)
      return;
    scoreTotalsAndBonuses();
  }, [gameIsEnded]);

  useEffect(() => {
    const { grandTotalUpper, lowerTotal, grandTotalGame } =
      scoredTotalsAndBonuses;
    if (!grandTotalUpper && !lowerTotal) return;
    if (grandTotalGame) return;

    scoreGameTotal(grandTotalUpper, lowerTotal);
  }, [scoredTotalsAndBonuses]);

  function scoreGameTotal(grandTotalUpper, lowerTotal) {
    dispatch({
      type: "SET_TOTALS_AND_BONSUSES_CELLS",
      payload: { grandTotalGame: grandTotalUpper + lowerTotal },
    });
  }

  function scoreTotalsAndBonuses() {
    scoreUpperTotalsAndBonuses();
    scoreLowerTotalsAndBonuses();
  }

  function scoreUpperTotalsAndBonuses() {
    if (!scoredConditionScoresUpper.length) return;

    const upperTotal = sumUp(scoredConditionScoresUpper);
    let upperBonus = null;
    let grandTotalUpper = 0;
    if (scoredTotalsAndBonuses.upperTotal >= 63)
      upperBonus = fixedScoresAndBonuses.upperTotalBonus;
    if (!upperBonus) grandTotalUpper = upperTotal;

    dispatch({
      type: "SET_TOTALS_AND_BONSUSES_CELLS",
      payload: { upperTotal, upperBonus, grandTotalUpper },
    });
  }

  function scoreLowerTotalsAndBonuses() {
    if (!scoredConditionScoresLower.length) return;

    const lowerTotal = sumUp(scoredConditionScoresLower);

    dispatch({
      type: "SET_TOTALS_AND_BONSUSES_CELLS",
      payload: { lowerTotal },
    });
  }

  // IN-GAME SCORING

  useEffect(() => {
    calculateQualifyingScoringCells(diceToScore);
  }, [diceToScore]);

  function conditionIsOfUpperOrLowerType(conditionName) {
    if (conditionNamesUpper.includes(conditionName)) return "upper";
    if (conditionNamesLower.includes(conditionName)) return "lower";
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
    function checkForThreeOfAKind(dice) {
      uniques.forEach((unique) => {
        if (calculateMatchedLength(unique, dice) === 3)
          scores["threeKind"] = sumOfRoll;
      });
    }

    function checkForFourOfAKind(dice) {
      uniques.forEach((unique) => {
        if (
          calculateMatchedLength(unique, dice) === 4 &&
          !scoredConditionNamesLower.includes("fourKind")
        )
          scores["fourKind"] = sumOfRoll;
      });
    }

    function checkForFullHouse(dice) {
      uniques.forEach((unique) => {
        if (
          calculateMatchedLength(unique, dice) === 3 &&
          !scoredConditionNamesLower.includes("fullHouse")
        )
          scores["fullHouse"] = fullHouseValue;
      });
    }

    function checkForStraights(dice) {
      const sortedRolledDiceStr = renderSortedRolledDiceStr(dice);

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
      ) {
        scores["smallStraight"] = smallStraightValue;
      }
    }

    const {
      fullHouseValue,
      smallStraightValue,
      largeStraightValue,
      yahtzeeValue,
    } = fixedScoresAndBonuses;

    const scores = { ...initialState.scoringCells.lower };
    const uniques = [...new Set(dice)];
    const uniquesLength = uniques.length;
    const sumOfRoll = sumUp(dice);

    if (!scoredConditionNamesLower.includes("chance"))
      scores["chance"] = sumOfRoll;
    if (uniquesLength === 1) scores["yahtzee"] = yahtzeeValue;
    if (uniquesLength === 2) {
      checkForFourOfAKind(dice);
      checkForFullHouse(dice);
    }
    if (
      uniquesLength === 3 &&
      !scoredConditionNamesLower.includes("threeKind")
    ) {
      checkForThreeOfAKind(dice);
    }

    checkForStraights(dice);

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

    if (conditionIsOfUpperOrLowerType(criterionName) === "upper")
      displayedCells.upper[criterionName] = score;
    if (conditionIsOfUpperOrLowerType(criterionName) === "lower")
      displayedCells.lower[criterionName] = score;

    dispatch({ type: "SET_SCORING_CELLS", payload: displayedCells });
  }

  function scoreCriterionCell(criterionName, score) {
    resetScoreCard(criterionName, score);

    const upperOrLower =
      conditionIsOfUpperOrLowerType(criterionName).toUpperCase();

    dispatch({
      type: `SET_SCORED_CONDITIONS_${upperOrLower}`,
      payload: { criterionName, score },
    });

    dispatch({ type: "SCORING_CRITERION_IS_SELECTED" });
  }

  return (
    <GameContext.Provider
      value={{
        rollDice,
        holdDie,
        returnDie,
        scoreCriterionCell,
        endGameEarly,
        rolledDice,
        heldDice,
        scoringCells,
        scoredTotalsAndBonuses,
        criterionIsSelected,
        gameIsEnded,
        isScoreable,
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
