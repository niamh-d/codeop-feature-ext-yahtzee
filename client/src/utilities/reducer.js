import { initialState } from "../data/data";

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLLED_DICE":
      return { ...state, rolledDice: action.payload };
    case "SET_HELD_DICE":
      return { ...state, heldDice: action.payload };
    case "SET_SCORED_DICE":
      return {
        ...state,
        isScoreable: true,
        yahtzeeIsClickable: true,
        diceToScore: action.payload,
      };
    case "SET_SCORED_CONDITIONS_UPPER":
      return {
        ...state,
        scoredConditions: {
          ...state.scoredConditions,
          upper: [...state.scoredConditions.upper, action.payload],
        },
      };
    case "SET_SCORED_CONDITIONS_LOWER":
      return {
        ...state,
        scoredConditions: {
          ...state.scoredConditions,
          lower: [...state.scoredConditions.lower, action.payload],
        },
      };
    case "SET_SCORING_CELLS":
      return {
        ...state,
        scoringCells: { ...state.scoringCells, ...action.payload },
      };
    case "YAHTZEE_IS_SCORED":
      return {
        ...state,
        yahtzeeIsScored: true,
      };
    case "ADD_YAHTZEE_BONUS":
      return {
        ...state,
        yahtzeeIsClickable: false,
        scoredTotalsAndBonuses: {
          ...state.scoredTotalsAndBonuses,
          yahtzeeBonusStars: action.payload,
        },
      };
    case "SET_TOTALS_AND_BONSUSES_CELLS":
      return {
        ...state,
        scoredTotalsAndBonuses: {
          ...state.scoredTotalsAndBonuses,
          ...action.payload,
        },
      };
    case "INCREMENT_COUNT_ROLL": {
      return { ...state, countRolled: state.countRolled + 1 };
    }
    case "SET_CRITERION_NOT_SELECTED":
      return { ...state, isScoreable: true, criterionIsSelected: false };
    case "SCORING_CRITERION_IS_SELECTED":
      return {
        ...state,
        countRolled: 0,
        countRound: state.countRound + 1,
        criterionIsSelected: true,
        rolledDice: [],
        heldDice: [],
        diceToScore: [],
        isScoreable: false,
        yahtzeeIsClickable: false,
      };
    case "END_GAME":
      return { ...state, gameIsEnded: true };
    case "NEW_GAME":
      return {
        ...initialState,
        countGame: state.countGame + 1,
      };
    default:
      throw new Error("Unknown action type");
  }
}
