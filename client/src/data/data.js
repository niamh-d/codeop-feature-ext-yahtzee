export const TOTAL_NUM_DICE = 5;
export const NUM_ROUNDS = 13;
export const NUM_ROLLS = 3;

export const initialState = {
  gameIsEnded: false,
  isScoreable: false,
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
  scoredTotalsAndBonuses: {
    upperTotal: null,
    upperBonus: null,
    grandTotalUpper: null,
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
};
