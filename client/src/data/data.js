export const TOTAL_NUM_DICE = 5;
export const NUM_ROUNDS = 13;
export const NUM_ROLLS = 3;

export const initialState = {
  yahtzeeIsClickable: false,
  yahtzeeIsScored: false,
  gameIsEnded: false,
  isScoreable: false,
  rolledDice: [],
  diceToScore: [],
  heldDice: [],
  countRolled: 0,
  countRound: 10,
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
      chance: null,
      yahtzee: null,
    },
  },
  scoredTotalsAndBonuses: {
    upperTotal: null,
    upperBonus: null,
    grandTotalUpper: null,
    yahtzeeBonusStars: "",
    lowerTotal: null,
    grandTotalGame: null,
  },
};

export const fixedScoresAndBonuses = {
  fullHouseValue: 25,
  smallStraightValue: 30,
  largeStraightValue: 40,
  yahtzeeValue: 50,
  upperTotalBonus: 35,
  yahtzeeBonus: 100,
};
