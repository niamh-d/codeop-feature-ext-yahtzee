export const gameSettings = {
  TOTAL_NUM_DICE: 5,
  NUM_ROUNDS: 13,
  NUM_ROLLS: 3,
};

const scoringCells = {
  upper: {
    aces: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
  },
  lower: {
    threeKind: 0,
    fourKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    chance: 0,
    yahtzee: 0,
  },
};

export const initialState = {
  counts: {
    countGame: 1,
    countRolled: 0,
    countRound: 0,
  },
  yahtzee: {
    yahtzeeIsClickable: false,
    yahtzeeScoreCount: 0,
  },
  gameIsEnded: false,
  isScoreable: false,
  dice: {
    rolledDice: [],
    diceToScore: [],
    heldDice: [],
  },
  scoringConditionIsSelected: true,
  scoredConditions: {
    upper: [],
    lower: [],
  },
  scoredCells: { ...scoringCells },
  displayedScoringCells: { ...scoringCells },
  scoredTotalsAndBonuses: {
    upperTotalScored: null,
    upperBonusScored: null,
    grandTotalUpperScored: null,
    yahtzeeBonusScored: null,
    lowerTotalScored: null,
    grandTotalGameScored: null,
  },
};

export const fixedScoresAndBonuses = {
  fullHouseValue: 25,
  smallStraightValue: 30,
  largeStraightValue: 40,
  yahtzeeValue: 50,
  upperTotalBonusValue: 35,
  yahtzeeBonusvalue: 100,
};
