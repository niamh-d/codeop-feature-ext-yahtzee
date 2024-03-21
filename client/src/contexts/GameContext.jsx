/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

import { useSession } from "./SessionContext";

import {
  initialState,
  fixedScoresAndBonuses,
  gameSettings,
} from "../data/data";
import {
  randKey,
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
      dice,
      displayedScoringCells,
      scoredConditions,
      scoredCells,
      scoredTotalsAndBonuses,
      scoringConditionIsSelected,
      isScoreable,
      yahtzee,
      counts,
      isFreshRoll,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { savePlayDetails } = useSession();

  const { rolledDice, heldDice, diceToScore } = dice;
  const { countRolled, countRound } = counts;
  const { yahtzeeScoreCount } = yahtzee;
  const { TOTAL_NUM_DICE, NUM_ROUNDS, NUM_ROLLS, NUM_DIE_SIDES } = gameSettings;

  // SET-UP AND SCORED CONDITION NAMES AND SCORES

  const conditionNamesUpper = Object.keys(
    initialState.displayedScoringCells.upper
  );
  const conditionNamesLower = Object.keys(
    initialState.displayedScoringCells.lower
  );

  function returnScoredConditionNamesAndScores(scoredConditions, nameOrScore) {
    return scoredConditions.map((condition) => condition[nameOrScore]);
  }

  const scoredConditionNamesUpper = returnScoredConditionNamesAndScores(
    scoredConditions.upper,
    "conditionName"
  );
  const scoredConditionScoresUpper = returnScoredConditionNamesAndScores(
    scoredConditions.upper,
    "score"
  );
  const scoredConditionNamesLower = returnScoredConditionNamesAndScores(
    scoredConditions.lower,
    "conditionName"
  );
  const scoredConditionScoresLower = returnScoredConditionNamesAndScores(
    scoredConditions.lower,
    "score"
  );

  // DICE ACTIONS

  function rollDice() {
    const numOfDiceToRoll = TOTAL_NUM_DICE - heldDice.length;
    const rolledNewDice = [...Array(numOfDiceToRoll)].map((_) =>
      randInt(NUM_DIE_SIDES)
    );
    const diceToScore = [...heldDice, ...rolledNewDice];

    dispatch({ type: "SET_ROLLED_DICE", payload: rolledNewDice });
    dispatch({ type: "SET_SCORED_DICE", payload: diceToScore });
    dispatch({ type: "INCREMENT_COUNT_ROLL" });
    if (countRolled >= NUM_ROLLS - 1)
      dispatch({ type: "SET_SCORING_CONDITION_NOT_SELECTED" });
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

  useEffect(() => {
    if (countRound >= NUM_ROUNDS + 1) dispatch({ type: "END_GAME" });
    else return;
  }, [countRound]);

  function endGameEarly() {
    dispatch({ type: "END_GAME" });
  }

  function newGame() {
    dispatch({ type: "NEW_GAME" });
  }

  useEffect(() => {
    const { grandTotalGameScored, upperTotalScored, lowerTotalScored } =
      scoredTotalsAndBonuses;

    const { countRound, countGame } = counts;

    const { yahtzeeScoreCount } = yahtzee;

    if (!grandTotalGameScored) return;

    const gameDetails = {
      grandTotalGameScored,
      upperTotalScored,
      lowerTotalScored,
      countRound: countRound - 1,
      countGame,
      yahtzeeScoreCount,
      gameComplete: countRound === NUM_ROUNDS + 1 ? 1 : 0,
    };

    savePlayDetails(gameDetails);
  }, [scoredTotalsAndBonuses]);

  // END GAME SCORING

  useEffect(() => {
    if (!scoredConditionNamesLower.length && !scoredConditionNamesUpper.length)
      return;
    scoreTotalsAndBonuses();
  }, [gameIsEnded]);

  function scoreTotalsAndBonuses() {
    const upper = scoreUpperTotalsAndBonuses();
    const lower = scoreLowerTotalsAndBonuses();

    const { grandTotalUpperScored } = upper;
    const { grandLowerTotalScored } = lower;
    const grandTotalGameScored = grandTotalUpperScored + grandLowerTotalScored;

    dispatch({
      type: "SET_TOTALS_AND_BONSUSES_CELLS",
      payload: { ...upper, ...lower, grandTotalGameScored },
    });
  }

  function scoreUpperTotalsAndBonuses() {
    if (!scoredConditionScoresUpper.length)
      return {
        upperTotalScored: 0,
        upperBonusScored: 0,
        grandTotalUpperScored: 0,
      };

    const upperTotalScored = sumUp(scoredConditionScoresUpper);
    let upperBonusScored = null;
    let grandTotalUpperScored = 0;
    if (scoredTotalsAndBonuses.upperTotalScored >= 63) {
      upperBonusScored = fixedScoresAndBonuses.upperTotalBonusValue;
      grandTotalUpperScored = upperTotalScored + upperBonusScored;
    }
    if (!upperBonusScored) grandTotalUpperScored = upperTotalScored;

    return { upperTotalScored, upperBonusScored, grandTotalUpperScored };
  }

  function scoreLowerTotalsAndBonuses() {
    if (!scoredConditionScoresLower.length)
      return {
        lowerTotalScored: 0,
        yahtzeeBonusScored: 0,
        grandLowerTotalScored: 0,
      };

    const { yahtzeeBonusValue } = fixedScoresAndBonuses;

    const yahtzeeBonusScored =
      yahtzeeScoreCount > 1 ? (yahtzeeScoreCount - 1) * yahtzeeBonusValue : 0;
    const lowerTotalScored = sumUp(scoredConditionScoresLower);
    const grandLowerTotalScored = lowerTotalScored + yahtzeeBonusScored;

    return { lowerTotalScored, yahtzeeBonusScored, grandLowerTotalScored };
  }

  // RESETTING DISPLAYED SCORING CELLS

  useEffect(() => {
    if (
      !scoredConditionScoresLower.length ||
      !scoredConditionScoresUpper.length
    )
      return;
    resetScoreCard();
  }, [scoredConditions]);

  function resetScoreCard() {
    dispatch({ type: "RESET_DISPLAYED_SCORING_CELLS" });
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
    const scores = { ...scoredCells.upper };

    const applicableConditionsUpper = conditionNamesUpper.filter(
      (condition) => !scoredConditionNamesUpper.includes(condition)
    );

    conditionNamesUpper.forEach((condition, i) => {
      const length = filterDiceAndCalculateLength(dice, i + 1);

      if (length && applicableConditionsUpper.includes(condition)) {
        scores[condition] = length * (i + 1);
      }
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
        (sortedRolledDiceStr === "1 2 3 4 5" ||
          sortedRolledDiceStr === "2 3 4 5 6") &&
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

    const scores = { ...scoredCells.lower };
    const uniques = [...new Set(dice)];
    const uniquesLength = uniques.length;
    const sumOfRoll = sumUp(dice);

    if (!scoredConditionNamesLower.includes("chance"))
      scores["chance"] = sumOfRoll;
    if (uniquesLength === 1) {
      scores["yahtzee"] = yahtzeeValue;
    }
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

    checkForStraights(uniques);

    return scores;
  }

  function calculateQualifyingScoringCells(dice) {
    const upper = calculateQualifyingScoringCellsUpper(dice);
    const lower = calculateQualifyingScoringCellsLower(dice);

    const combinedScores = { upper, lower };

    dispatch({ type: "SET_DISPLAYED_SCORING_CELLS", payload: combinedScores });
  }

  function setScoredConditionsArray(conditionName, score, upperOrLower) {
    dispatch({
      type: `SET_SCORED_CONDITIONS_ARRAY_${upperOrLower}`,
      payload: { conditionName, score },
    });
  }

  function setScoredCells(conditionName, score, upperOrLower) {
    const scoredCell = {};
    scoredCell[conditionName] = score;

    dispatch({
      type: `SET_SCORED_CELLS_${upperOrLower}`,
      payload: scoredCell,
    });
  }

  function scoreConditionCell(conditionName) {
    if (conditionName === "yahtzee") {
      dispatch({
        type: "INCREMENT_YAHTZEE_SCORE_COUNT",
      });

      if (yahtzeeScoreCount >= 1) return;
    }

    const upperOrLower = conditionIsOfUpperOrLowerType(conditionName);
    const upperOrLowerReducerStr = upperOrLower.toUpperCase();

    const score = displayedScoringCells[upperOrLower][conditionName];

    setScoredCells(conditionName, score, upperOrLowerReducerStr);

    setScoredConditionsArray(conditionName, score, upperOrLowerReducerStr);

    dispatch({ type: "SCORING_CONDITION_IS_SELECTED" });
  }

  return (
    <GameContext.Provider
      value={{
        rollDice,
        holdDie,
        returnDie,
        scoreConditionCell,
        endGameEarly,
        newGame,
        dice,
        displayedScoringCells,
        scoredTotalsAndBonuses,
        scoringConditionIsSelected,
        gameIsEnded,
        isScoreable,
        isFreshRoll,
        yahtzee,
        counts,
        randKey,
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
