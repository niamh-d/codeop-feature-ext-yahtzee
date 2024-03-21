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

export const gameSettings = {
  TOTAL_NUM_DICE: 5,
  NUM_ROUNDS: 13,
  NUM_ROLLS: 3,
  NUM_DIE_SIDES: 6,
};

export const fixedScoresAndBonuses = {
  fullHouseValue: 25,
  smallStraightValue: 30,
  largeStraightValue: 40,
  yahtzeeValue: 50,
  upperTotalBonusValue: 35,
  yahtzeeBonusValue: 100,
};

export const initialState = {
  isFreshRoll: false,
  gameIsEnded: false,
  isScoreable: false,
  scoringConditionIsSelected: true,
  counts: {
    countGame: 1,
    countRolled: 0,
    countRound: 1,
  },
  dice: {
    rolledDice: [],
    diceToScore: [],
    heldDice: [],
  },
  yahtzee: {
    yahtzeeIsClickable: false,
    yahtzeeScoreCount: 0,
  },
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
    lowerTotalScored: null,
    yahtzeeBonusScored: null,
    grandLowerTotalScored: null,
    grandTotalGameScored: null,
  },
};
