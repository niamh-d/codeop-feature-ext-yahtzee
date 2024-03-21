import { initialState } from "../data/data";

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLLED_DICE":
      return {
        ...state,
        isFreshRoll: true,
        dice: { ...state.dice, rolledDice: action.payload },
      };
    case "SET_HELD_DICE":
      return {
        ...state,
        isFreshRoll: false,
        dice: { ...state.dice, heldDice: action.payload },
      };
    case "SET_SCORED_DICE":
      return {
        ...state,
        isScoreable: true,
        yahtzee: { ...state.yahtzee, yahtzeeIsClickable: true },
        dice: { ...state.dice, diceToScore: action.payload },
      };
    case "SET_SCORED_CONDITIONS_ARRAY_UPPER":
      return {
        ...state,
        scoredConditions: {
          ...state.scoredConditions,
          upper: [...state.scoredConditions.upper, action.payload],
        },
      };
    case "SET_SCORED_CONDITIONS_ARRAY_LOWER":
      return {
        ...state,
        scoredConditions: {
          ...state.scoredConditions,
          lower: [...state.scoredConditions.lower, action.payload],
        },
      };
    case "RESET_DISPLAYED_SCORING_CELLS":
      return {
        ...state,
        displayedScoringCells: {
          ...state.scoredCells,
        },
      };
    case "SET_DISPLAYED_SCORING_CELLS":
      return {
        ...state,
        displayedScoringCells: {
          ...action.payload,
        },
      };
    case "SET_SCORED_CELLS_UPPER":
      return {
        ...state,
        scoredCells: {
          ...state.scoredCells,
          upper: { ...state.scoredCells.upper, ...action.payload },
        },
      };
    case "SET_SCORED_CELLS_LOWER":
      return {
        ...state,
        scoredCells: {
          ...state.scoredCells,
          lower: { ...state.scoredCells.lower, ...action.payload },
        },
      };
    case "YAHTZEE_IS_SCORED":
      return {
        ...state,
        yahtzee: { ...state.yahtzee, yahtzeeIsScored: true },
      };
    case "INCREMENT_YAHTZEE_SCORE_COUNT":
      return {
        ...state,
        yahtzee: {
          ...state.yahtzee,
          yahtzeeIsClickable: false,
          yahtzeeScoreCount: state.yahtzee.yahtzeeScoreCount + 1,
        },
      };
    case "SET_TOTALS_AND_BONSUSES_CELLS":
      return {
        ...state,
        scoredTotalsAndBonuses: {
          ...action.payload,
        },
      };
    case "INCREMENT_COUNT_ROLL": {
      return {
        ...state,
        counts: { ...state.counts, countRolled: state.counts.countRolled + 1 },
      };
    }
    case "SET_SCORING_CONDITION_NOT_SELECTED":
      return { ...state, isScoreable: true, scoringConditionIsSelected: false };
    case "SCORING_CONDITION_IS_SELECTED":
      return {
        ...state,
        counts: {
          ...state.counts,
          countRolled: 0,
          countRound: state.counts.countRound + 1,
        },
        scoringConditionIsSelected: true,
        dice: {
          rolledDice: [],
          heldDice: [],
          diceToScore: [],
        },
        isScoreable: false,
        yahtzee: { ...state.yahtzee, yahtzeeIsClickable: false },
      };
    case "END_GAME":
      return { ...state, gameIsEnded: true };
    case "NEW_GAME":
      return {
        ...initialState,
        counts: {
          countGame: state.counts.countGame + 1,
          countRound: 1,
          countRolled: 0,
        },
      };
    default:
      throw new Error("Unknown action type");
  }
}
