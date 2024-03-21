export const randInt = (num) => Math.floor(Math.random() * num) + 1;

export const sumUp = (nums) => {
  return nums.reduce((acc, curr) => acc + curr, 0);
};

export const renderSortedRolledDiceStr = (dice) => dice.sort().join(" ");

export function filterDiceAndCalculateLength(dice, val) {
  return dice.filter((num) => num === val).length;
}

export function calculateMatchedLength(unique, dice) {
  return dice.filter((dice) => dice === unique).length;
}

export function randKey() {
  const randInt17 = randInt(17);
  return `${randInt17}${wordsArr[randInt17]}`;
}

const wordsArr =
  "messe ocus pangur ban cechtar nathar fria saindan bith a menmasam fri seilgg mu menma céin im saincheirdd".split(
    " "
  );
